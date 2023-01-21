import { db } from '../../db/firebase'
import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs, arrayUnion, doc, updateDoc } from "firebase/firestore";
import {AgGridReact} from 'ag-grid-react';
import './JobsListStyles.css'
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import { UserAuth } from '../../context/AuthContext';




const SimpleComp = (p) => {
  const { user, currentUserData } = UserAuth();
  function applyHandler() {
    const jobRef = doc(db, "employee", user.uid);
    const job = p.data["Position Name"];
    updateDoc(jobRef, {
      "Applied jobs": arrayUnion(job),
    }).catch((e) => console.log(e));
  }
  return (
    <>
      {currentUserData.type === "employee" ? (
        <>
          <button className="apply-btn" onClick={applyHandler}>
            apply
          </button>
          <Link to={`/job/${p.data.id}`}>{p.value}</Link>
        </>
      ) : (
        <Link to={`/job/${p.data.id}`}>{p.value}</Link>
      )}
    </>
  );
};


const JobsList = () => {
  const {isSidebarOpen} = UserAuth()
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState([]);


  useEffect(() => {
    let arr = []
    setLoading(true)
    getDocs(collection(db, "jobs")).then((docs) => {
      docs.forEach(doc => arr.push({...doc.data(), id:doc.id}))
      setDocs(arr)
      setLoading(false)
    })
    
  }, [])

  //////DEF AGGrid options///////////////////////////////////////
  const rowData = docs
 
  const [columnDefs , setColumnDefs] = useState([
    { cellRenderer: SimpleComp, field: "Position Name", cellClass:"cellClass"},
    { headerName: "Category", field: "Category" },
    { headerName: "Location", field: "Location",},
    { headerName: "Client", field: "Client" },
    { headerName: "MaxSalary", field: "MaxSalary" },
    { headerName: "MinSalary", field: "MinSalary" },
    { headerName: "Remote", field: "Remote" },
    { headerName: "Applied", field: "Remote" }
   
  ])

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);




  const styles = {
    button: {
      maxWidth:"200px",
      height: '25px',
      marginBottom:'10px'
    },
  }

///////////////rendering Loader if still loadings
  if (loading) return <Loader />
  
  
  return (

    <div class={isSidebarOpen?'sideBarOpen':null}>
      <div className='create-job-header'>
        <h1>Jobs</h1>
        <Button variant='contained' sx={styles.button}
        >+ Create Job</Button>
      </div>
      
       

     <div className="ag-theme-alpine"
				style={{
					height: '75vh',
          width: '100%',
          textAlign:'left'
				}}
			>
				<AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
					rowData={rowData}>
				</AgGridReact>
			</div>
    
    </div>
   
  )
}

export default JobsList