import { type Advocate } from "../../../../db/schema";
import AdvocateCard from "./AdvocateCard";

interface AdvocatesListProps {
  advocates: Advocate[];
}

export default function AdvocatesList({ advocates }: AdvocatesListProps) {
  return (
    <div className="advocates-list">
      <ol>
        {advocates.map((advocate) => (
          <li key={advocate.id}>
            <AdvocateCard advocate={advocate} />
          </li>
        ))}
      </ol>
    </div>
  );
}