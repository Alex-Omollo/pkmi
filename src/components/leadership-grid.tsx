import Image from "next/image";
import { leaders, leaderSrc } from "@/data/leadership";

export function LeadershipGrid() {
  return (
    <div className="leader-grid">
      {leaders.map((l) => (
        <article className="leader-card" key={l.name}>
          <div className="leader-photo">
            <Image
              src={leaderSrc(l.photo)}
              alt={l.name}
              fill
              sizes="(max-width: 1050px) 33vw, 220px"
              style={l.focus ? { objectPosition: l.focus } : undefined}
            />
          </div>
          <h3>{l.name}</h3>
          <p>{l.role}</p>
        </article>
      ))}
    </div>
  );
}
