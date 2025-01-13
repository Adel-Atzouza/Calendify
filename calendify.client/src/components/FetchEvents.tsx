import { useEffect, useRef, useState } from "react";
import { EventModel } from "./Event.state";
import { EventList } from "./EventsList";
import Loading from "./Loading";
import { Button, CardActions, Typography } from "@mui/material";

export function GetAllEvents() {
  const [Error, setError] = useState("");
  const [Events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      try {
        const response = await fetch(`/Events/Events?PageNumber=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        setIsLoading(true);
        const result = (await response.json()) as EventModel[];
        setEvents(result);
      } catch (e: any) {
        if (e.name == "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(`An error has occured`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [page]);

  if (Error != "") {
    return <Typography variant={"h3"}>{Error}!!!</Typography>;
  }

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && <EventList Events={Events} />}
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setPage(page - 1)}>Previous Page</Button>
        <Typography>{page}</Typography>
        <Button onClick={() => setPage(page + 1)}>Next Page</Button>
      </CardActions>
    </div>
  );
}
