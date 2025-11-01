import { useState, useEffect } from "react";
import { parse } from "yaml";

export default function Parse() {
  const [yaml, setYaml] = useState("");
  const [error, setError] = useState(null);
  const [pps, setPps] = useState(null);

  useEffect(() => {
    async function f() {
      try {
        const params = new URLSearchParams(new URL(document.location).search);

        const pps_src = params.get("src");
        const pps_text = params.get("text");

        if (pps_src) {
          const res = await fetch(pps_src);
          const data = await res.text();
          setYaml(data);
        } else if (pps_text) {
          setYaml(pps_text);
        }
      } catch (e) {
        setError(e.message);
      }
    }
    f();
  }, []);

  useEffect(() => {
    console.log(yaml);
    try {
      const pps = parse(yaml);
      setPps(pps);
      setError(null);
    } catch (e) {
      setError(e.message);
      setPps(null);
    }
  }, [yaml]);

  return (
    <div>
      <div className="error">{error}</div>
      <textarea
        className="block border w-full"
        onChange={(e) => setYaml(e.target.value)}
      ></textarea>

      {pps && (
        <div>
          <h2 className="text-xl">Result</h2>
          <div className="space-y-5">
            <PersonalDetails data={pps.personal_details} />
            <Educations data={pps.educations} />
          </div>
        </div>
      )}
    </div>
  );
}

function PersonalDetails({ data }) {
  if (!data) return null;

  return (
    <div>
      <h1>{data.first_name} {data.middle_name} {data.last_name} ({data.preferred_first_name})</h1>
      <p>{data.gender}</p>
      <p>{data.race}</p>
      <p>{data.location}</p>
      <p>{data.contact.email}</p>
      <p>{data.contact.country_code} {data.contact.phone_number}</p>
      <p>{data.contact.website}</p>
    </div>
  );
}

function Educations({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>Education</h2>
      {data.map((education, index) => (
        <div key={index}>
          <h3>{education.name}</h3>
          <p>{education.location}</p>
          <p>{education.from} - {education.to}</p>
          <p>{education.degree_name} in {education.field_of_study}</p>
          <ul>
            {education.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}