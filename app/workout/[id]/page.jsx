import WorkoutDetail from "@/components/WorkoutDetail";

// Server component: reads the dynamic route param, hands it to the client component.
export default async function WorkoutPage({ params }) {
  const { id } = await params;
  return <WorkoutDetail id={id} />;
}
