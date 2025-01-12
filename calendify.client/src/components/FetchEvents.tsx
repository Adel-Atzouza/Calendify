const BASE_URL = ""
export default function fetchEvents(){
    useEffect(() => {
        fetch("v2/settings", 
          {
              method: "GET",
              headers: {
                  "Accept-Type": "application/json",
              }
          }
        ).then(response => {
          if (response.ok)
          {
            return response.json()
          }
        })
        .then(
            x => setFormValues( x )
        )
        
      }, []);
}