import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Caraousel from '../components/Caraousel'


const Home = () => {
    const [search, setsearch] = useState('')
    const [foodcat, setfoodcat] = useState([])
    const [fooditem, setfooditem] = useState([])

    const loaddata = async () => {
        var response = await fetch('http://localhost:5000/api/fooddata',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }

            }

        )
        response = await response.json()
        setfooditem(response[0])
        setfoodcat(response[1])
        // console.log(response[0],response[1]);
        // setfoodcat(data)
    }

    useEffect(() => {
        loaddata()
    }, [])

    return (

        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <form className="d-flex justify-content-center" >
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </form>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodcat !== []
                        ? foodcat.map((data) => {
                            return (<div className='row mb-3'>
                                <div className="fs-3 m-3" key={data._id}>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    fooditem !== [] ?
                                        fooditem.filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                            .map(filteritems => {
                                                return (
                                                    <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodname={filteritems}
                                                            options={filteritems.options[0]}

                                                        ></Card>
                                                    </div>
                                                )
                                            })
                                        : <div></div>
                                }
                            </div>

                            )
                        }) : <div></div>
                }
            </div>
            <div>
                <Footer />
            </div>
        </div >

    )
}

export default Home