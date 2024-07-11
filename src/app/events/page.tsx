import Title from "@/components/Title";
import { EventModel } from "@/types/Model";
import EventCard from "@/components/EventCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const events: EventModel[] = [
    {
      id: "1",
      name: " Desenvolvimento de software",
      organization: "Cubos",
      date: "2024-06-20T09:00:00Z",
      location: "Penapolis",
      price: 0,
      rating: "",
      image_url: ""
    },
    {
      id: "12",
      name: " Desenvolvimento de software",
      organization: "Cubos",
      date: "2024-06-20T09:00:00Z",
      location: "Penapolis",
      price: 0,
      rating: "",
      image_url: ""
    },
    {
      id: "3",
      name: " Desenvolvimento de software",
      organization: "Cubos",
      date: "2024-06-20T09:00:00Z",
      location: "Penapolis",
      price: 0,
      rating: "",
      image_url: ""
    },
  ]
  const session = await getServerSession();

  if(!session) {
    redirect("/")
  }
  return (
    <main className="mt-10 flex flex-col">
      <Title>Eventos Disponiveis</Title>
      <div className="mt-8 sm:grid  flex flex-wrap justify-center gap-x-2 gap-y-4">
        {
          events.map((event) => (
            <EventCard key={event.id} event={event}/>
          ))
        }
        </div>
    </main>
  );
}