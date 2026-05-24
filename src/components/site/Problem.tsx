export function Problem() {
  const stats = [
    { value: "1.2M", label: "Malaysian SMEs" },
    { value: "Most", label: "benefits go underused" },
    { value: "0", label: "HR staff in companies under 30 people" },
  ];
  return (
    <section id="problem" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The gap that kills employee benefits
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          SME owners pay for health plans. Employees forget the app, lose the
          policy, or just Google instead. Usage data does not exist, so
          providers cannot prove value at renewal.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="panel hover-glow p-6">
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
