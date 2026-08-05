import {
  AccessToken,
  EgressClient,
  RoomServiceClient,
  EncodedFileOutput,
  EncodedFileType,
  S3Upload,
} from "livekit-server-sdk";

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "devkey";
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "secret";
const LIVEKIT_URL = process.env.LIVEKIT_URL || "ws://localhost:7880";

export const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
export const egressClient = new EgressClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

export async function createLiveKitToken(
  roomName: string,
  participantName: string,
  isHost: boolean,
) {
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    name: participantName,
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    roomAdmin: isHost, // Host can manage the room
  });

  return await at.toJwt();
}

export async function startRoomRecording(roomName: string, roomId: string) {
  const s3Endpoint = process.env.R2_ENDPOINT_URL || "";
  const s3AccessKey = process.env.R2_ACCESS_KEY_ID || "";
  const s3SecretKey = process.env.R2_SECRET_ACCESS_KEY || "";
  const s3Bucket = process.env.R2_BUCKET_NAME || "placepro-media";

  const fileOutput = new EncodedFileOutput({
    fileType: EncodedFileType.MP4,
    filepath: `recordings/${roomId}/{room_name}-{time}.mp4`,
    output: {
      case: "s3",
      value: new S3Upload({
        accessKey: s3AccessKey,
        secret: s3SecretKey,
        region: "auto",
        endpoint: s3Endpoint,
        bucket: s3Bucket,
      }),
    },
  });

  const info = await egressClient.startRoomCompositeEgress(
    roomName,
    {
      file: fileOutput,
    },
    {
      layout: "speaker",
    },
  );

  return info;
}
