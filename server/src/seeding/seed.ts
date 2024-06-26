import seedEmployer from "./employerSeeding";
import seedJobs from "./JobSeeding";
import seedStudents from "./studentSeeding";
import seedApplications from "./applicationSeeding";
import seedConversation from "./conversationSeeding";

console.log("Seeding data to test database...");

const seed = async () => {
  await seedEmployer();
  await seedStudents();
  await seedJobs();
  await seedApplications();
  await seedConversation();
};

void seed();
