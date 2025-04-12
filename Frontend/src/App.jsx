import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
// import Login from './pages/Login'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Company from './components/Company'
import Interviewer from './components/Interviewer'
import CompanyProtectedRoute from './components/admin/CompanyProtectedRoute'
import InterviwerProtectedRoute from './components/admin/InterviwerProtectedRoute'
import MoreCompanyInfo from './components/MoreCompanyInfo'
import CompanyInfo from './components/CompanyInfo'
import CompanyProfile from './components/CompanyProfile'
import PostJobCompany from './components/PostJobCompany'
import GetAllJobs from './components/GetAllJobs'
import JobDetails from './components/JobDetails'
import JobTable from './components/JobTable'
import UserProtectedRoute from './components/admin/UserProtectedRoute'
import User from './components/User'
import Create from './components/Create'
import EducationalDetails from './components/EducationalDetails'
import OtherDetails from './components/OtherDetails'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element:<UserProtectedRoute><Home /></UserProtectedRoute>
  },
  {
    path: '/user',
    element: <UserProtectedRoute><User/></UserProtectedRoute>
  },
  {
    path: '/company',
    element: <CompanyProtectedRoute><Company /></CompanyProtectedRoute>

  },
  {
    path: '/create',
    element: <UserProtectedRoute><Create/></UserProtectedRoute>

  },
  {
    path: '/educational-details',
    element: <EducationalDetails/>
  },
  {
    path: '/other-details',
    element: <OtherDetails/>

  },
  {
    path: '/Interviewer',
    element: <InterviwerProtectedRoute><Interviewer /></InterviwerProtectedRoute>

  },
  
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },

  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/company/post",
    element: <PostJobCompany />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/companyProfile",
    element: <CompanyProfile />
  },
  {
    path: "/company/getAlljob",
    element: <GetAllJobs />
  },
  {
    path: "/jobTable/:jobId",
    element: <JobTable />
  },
  {
    path: "/company/getAlljob/:jobId",
    element: <JobDetails />

  },
  {
    path: "/company/moreInfo",
    element: <MoreCompanyInfo />
  },
  {
    path: "/companyInfo",
    element: <CompanyProtectedRoute> <CompanyInfo /></CompanyProtectedRoute>
  },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <Companies />
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
