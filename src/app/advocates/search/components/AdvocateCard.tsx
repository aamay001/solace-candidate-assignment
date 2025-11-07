import React from 'react';
import { type Advocate } from "../../../../db/schema";

interface AdvocateCardProps {
  advocate: Advocate;
}

export default React.memo(function AdvocateCard({ advocate }: AdvocateCardProps) {
  const { firstName, lastName, city, phoneNumber, degree, specialties, yearsOfExperience } = advocate;

  return (
    <div className="advocate-card">

      <div className="advocate-card-header">

        <div className="avocate-card-avatar">
          <span>{`${firstName[0]}${lastName[0]}`}</span>
        </div>

        <div className="flex flex-col flex-grow md:basis-[50%]">
          <h3 className="text-left text-2xl font-extralight line-clamp-1">{firstName} {lastName}</h3>
          <span className="line-clamp-1">📍&nbsp;Location:&nbsp;{city}</span>
        </div>

        <div className="flex flex-col items-center gap-1 m-auto lg:ml-auto bg-gray-100 p-3 rounded-lg w-full">
          <span>🎓&nbsp;Degree:&nbsp;{degree}</span>
          <span>{yearsOfExperience} years of experience</span>
        </div>

      </div>

      <div className="advocate-card-specialties" title={specialties.join('\n')}>
        <span className="font-normal">📚 Specialties:</span>
        <span className="line-clamp-2 pl-6">{specialties.slice(0, 5).join(', ')}</span>
        <span className="text-gray-500 text-right mr-1 mt-auto">{`${specialties.length} total`}</span>
      </div>

      <div className="advocate-card-footer">
        <a href={`tel:${phoneNumber}`}>📞 Call</a>
        <a href="mailto:email@example.com&subject=Seeking an advocate for my case" target="_blank" rel="noopener noreferrer">📧 Email</a>
      </div>

    </div>
  );
});