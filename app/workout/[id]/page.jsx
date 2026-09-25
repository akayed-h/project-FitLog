import WorkoutDetail from "@/components/WorkoutDetail";


export default async function WorkoutPage({ params }) {
  const { id } = await params;
  return <WorkoutDetail id={id} />;
}
