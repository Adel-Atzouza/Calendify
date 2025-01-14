import { useEffect, useRef, useState } from "react";
import { Button, CardActions, Typography } from "@mui/material";

export function GetAllAttendance() {
    const [error, setError] = useState<string>("");
    const [events, setEvents] = useState<any[]>([]); // You can define a proper type for your events
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    function handleClickPrevious() {
        if (page > 1) setPage(page - 1);
    }

    function handleClickNext() {
        setPage(page + 1);
    }

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            try {
                setIsLoading(true);
                // Using fetch instead of axios
                const response = await fetch(`http://localhost:5000/attendance?page=${page}`, {
                    method: 'GET',
                    signal: abortControllerRef.current?.signal, // To handle cancellation
                });

                const result = await response.json();

                // Assuming the response contains events and pagination info
                setIsLastPage(result.isLastPage);
                setEvents(result.events); // Update the state with fetched events
            } catch (e: any) {
                if (e.name === "AbortError") {
                    console.log("Aborted");
                    return;
                }
                setError("An error occurred while fetching events");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [page]);

    if (error !== "") {
        return <Typography variant={"h3"}>{error}!!!</Typography>;
    }

    return (
        <div>
            {isLoading && <Typography variant="h6">Loading...</Typography>}
            {!isLoading && (
                <div>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography variant="body1">{event.description}</Typography>
                                <Typography variant="body2">
                                    {event.date} {event.startTime} - {event.endTime}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <CardActions
                sx={{
                    justifyContent: "center",
                }}
            >
                <Button onClick={handleClickPrevious} disabled={page === 1}>
                    Previous Page
                </Button>
                <Typography>{page}</Typography>
                <Button onClick={handleClickNext} disabled={isLastPage}>
                    Next Page
                </Button>
            </CardActions>
        </div>
    );
}
