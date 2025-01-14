import React, { useEffect, useState } from "react";
import { useSession } from "../SessionContext";

// Pas aan als jouw event-model andere velden bevat
interface EventModel {
  id: number;
  title: string;
  description?: string;
  category?: string;
  date?: string;
}

const Recommendations: React.FC = () => {
  // Haal userId uit de session
  const { session } = useSession();
  const userId = session?.user?.id ?? "";

  // Lokale state
  const [recommendations, setRecommendations] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Als er geen user is ingelogd, stop de fetch
    if (!userId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/Recommendations/${userId}`);
        if (response.ok) {
          const data: EventModel[] = await response.json();
          setRecommendations(data);
        }
      } catch {
        // Als er een fout is, laat gewoon geen aanbevelingen zien
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (!userId || loading || recommendations.length === 0) {
    // Geen output als er geen aanbevelingen zijn
    return null;
  }

  // Anders tonen we de lijst met aanbevolen events
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((ev) => (
          <li key={ev.id} style={{ marginBottom: "8px" }}>
            <strong>{ev.title}</strong>
            {ev.category && <span> - {ev.category}</span>}
            <br />
            {ev.description}
            {ev.date && <div>{new Date(ev.date).toDateString()}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
