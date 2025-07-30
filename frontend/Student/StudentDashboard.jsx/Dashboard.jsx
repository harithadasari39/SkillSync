import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EnrolledCourses from "../components/EnrolledCourses";
import Certifications from "../components/Certifications";
import JobListings from "../components/JobListings";
import InterviewSchedule from "../components/InterviewSchedule";
import ResumeProfile from "../components/ResumeProfile";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 space-y-6">
        <Header studentName="Haritha Dasari" progress={40} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <EnrolledCourses />
          <Certifications />
          <JobListings />
          <InterviewSchedule />
          <ResumeProfile />
        </div>
      </main>
    </div>
  );
}
