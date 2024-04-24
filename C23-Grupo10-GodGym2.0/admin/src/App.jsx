import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar'
import './assets/css/app.css'
import ContentWrapper from './components/ContentWrapper'

function App() {
  const [apiData, setApiData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [categoryData,setCategoryData]= useState(null)
  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData('http://localhost:3000/api/allusers', setApiData); //users
    fetchData('http://localhost:3000/api/all', setProductData); //products
    fetchData('http://localhost:3000/api/allcategories', setCategoryData);//categorias
  }, []); 

  return (
    <>
      <div id="wrapper">
        <SideBar />
        <ContentWrapper apiData={apiData} productData={productData} categoryData={categoryData}/>
      </div>
    </>
  );
}

export default App;


//CONSUMIR APIS Y ENVIARLOS A LOS HIJOS, IMPORTARLOS EN CONTAINER SECCION. 
