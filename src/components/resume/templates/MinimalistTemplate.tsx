export interface ResumeData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  experiences: {
    id: string;
    title: string;
    employer: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-black p-8 max-w-[800px] w-full min-h-[1056px] shadow-sm font-serif" style={{ fontFamily: "Georgia, serif" }}>
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.firstName} {data.lastName}</h1>
        <p className="text-xl text-gray-700 italic mb-2">{data.title}</p>
        <div className="flex justify-center gap-4 text-sm">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-400 mb-4 pb-1">Experience</h2>
        <div className="space-y-6">
          {data.experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <span className="text-sm italic">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-md font-semibold mb-2">{exp.employer}</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
