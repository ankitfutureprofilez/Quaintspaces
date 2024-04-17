"use client"

import CourseProgress from '../components/Cards/CourseProgress'
import CurrentProject from '../components/Cards/CurrentProject'
import EmployeeSpotlight from '../components/Cards/EmployeeSpotlight'
import Notes from '../components/Cards/Notes'
import StatusTracker from '../components/Cards/StatusTracker'
import TimeTracker from '../components/Cards/TimeTracker'
import TraningAnalysis from '../components/Cards/TraningAnalysis'
import Sidebar from '../components/Sidebar';
import Listing from '../api/Listing';
import MetaTag  from "../hook/Metatag"

import AdminLayout from "../AdminLayout"
import { AnimatePresence, motion } from 'framer-motion'
import { useState ,useEffect } from 'react'

function Home() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const handleSidebarChange = (value) => {
    setIsSidebarOpen(value)
  }

  const [record ,setRecord] =useState([])

  useEffect(()=>{
    const main =  new Listing();
    const response =  main.statistics();
    response.then((res)=>{
      console.log("res",res?.data)
      setRecord(res?.data)
    }
    ).catch((error)=>{
      console.log("error",error)
    })
  },[])

  return (<>
  <MetaTag/>
    <AdminLayout>
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className={`${isSidebarOpen ? 'overflow-hidden' : ''} h-screen`} >
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsSidebarOpen(false)}
            className='bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.25 }}
            className='absolute md:hidden z-30 top-0 left-0'
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex'>

        <div className='w-full '>
          <div className='p-4 md:p-6 space-y-4 columns-1 sm:columns-2 lg:columns-3'>
            <div className='break-inside-avoid-column space-y-4'>
              <TraningAnalysis data={record?.user} />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
          <CourseProgress/>
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <EmployeeSpotlight />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <TimeTracker />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <Notes />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <StatusTracker properties={record?.property}/>
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <CurrentProject />
            </div>
          </div>

        </div>
      </div>

    </motion.div>
    </AdminLayout>
  </>

  )
}

export default Home