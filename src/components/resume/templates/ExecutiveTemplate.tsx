import { ResumeData } from "./MinimalistTemplate";

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-900 p-10 max-w-[800px] w-full min-h-[1056px] shadow-sm font-sans" style={{ fontFamily: "Arial, sans-serif" }}>
      <header className="flex justify-between items-end border-b-4 border-gray-900 pb-4 mb-8">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter mb-1">{data.firstName} {data.lastName}</h1>
          <p className="text-xl font-medium text-gray-600 uppercase tracking-widest">{data.title}</p>
        </div>
        <div className="text-right text-sm font-medium text-gray-600 flex flex-col gap-1">
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </div>
      </header>

      <div>
        <h2 className="text-2xl font-black uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-4">
          <span className="bg-gray-900 text-white px-2 py-1 text-sm">01</span> Experience
        </h2>
        <div className="space-y-8 pl-1">
          {data.experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-md font-semibold text-primary mb-3">{exp.employer}</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
