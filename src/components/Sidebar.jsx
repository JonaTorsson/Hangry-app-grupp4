import { useState, useEffect } from 'react'
import GetMyLocation from './GetMyLocation'
import SearchField from './SearchField'
import ResultsList from './ResultsList'
import { ListGroup, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import useGetQueryRestaurants from '../hooks/useGetQueryRestaurants'
import mapAPI from '../services/mapAPI'


const Sidebar = ({handleMapOnSubmit, coordinates, userPosition}) => {
    //open close form
    //const [open, setOpen] = useState(true)
 
    //States of what the user has filtered restaurant on, render list differently depending on state
    const [nameOrder, setNameOrder] = useState('asc') //orders it ascending by default. set orderBy funktion to read NameOrder and sort it by descending or ascending. 
    const [type, setType] = useState('no-filter')
    const [city, setCity] = useState('')
    const [querys, setQuerys] = useState({
        nameOrder,
        type,
        city,
    })

    //get Querys
    const { data, loading } = useGetQueryRestaurants(querys)


     //When user has submitted serach form
         const handleOnSubmit = async (address) => {

            // If no address has been given, abort
            if(!address) {
                return
            }
       
            setCity(await mapAPI.getSearchedCity(userPosition))

            handleMapOnSubmit(address)
        }


    useEffect( () => {
        console.log("order is " + nameOrder)
        console.log('querys.nameOrder',querys.nameOrder)

        const changeQuerys = async () => {
            setQuerys({
                nameOrder,
                type,
                city: await mapAPI.getSearchedCity(userPosition)
            })
        }
        changeQuerys()
    }, [nameOrder, type, city, userPosition] )

console.log("vad är" + data)






    return (
        <>
            <div className="searchBoxWrapperMobile p-2">
                <Row>
                    {/* SEARCH FIELD */}
                    <Col xs={12}>
                        <div className="searchBox d-flex flex-row align-items-center">
                            {/* Sökfält med sök-knapp */}
                            <SearchField onSubmit={handleOnSubmit} /* setOpen={setOpen} */ setQuerys={setQuerys}/>
                               {/* Knapp för att hitta sin position*/}
                            <GetMyLocation /*  myLocation={myLocation} */ />
                        </div>
                    </Col>


                    { data && (

                    <>
                    <Col>
                    
                        <div>
                        
                        <Form.Group as={Col} controlId="restaurantName" className="mb-3">  
                                        <Form.Label as="legend">
                                             Sortera
                                        </Form.Label>
                                        <Form.Select   
                                            onChange={(e) =>
                                                {setNameOrder(e.target.value)}} 
                                                defaultValue={nameOrder}
                                                className='form-select'>
                                            <option value='asc'>Ascendign</option>
                                            <option value='desc'>Descendign</option>
                
                                        </Form.Select>   
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="restaurantType" className="mb-3">  
                                        <Form.Label as="legend">
                                            Typ
                                        </Form.Label>
                                        <Form.Select   
                                            onChange={(e) =>
                                                {setType(e.target.value)}} 
                                                defaultValue={type}
                                                className='form-select'>
                                            <option value='café'>Café</option>
                                            <option value='restaurang'>Restaurang</option>
                                            <option value='snabbmat'>Snabbmat</option>
                                            <option value='kiosk-grill'>Kiosk/Grill</option>
                                            <option value='foodtruck'>Foodtruck</option>
                                        </Form.Select>   
                                    </Form.Group>
                                    
                        </div>
                       
                    </Col>
                 
              

                        <h1>LISTA</h1>
                        {/* Listan med resultat av restauranger */}

                        
                            <>
                                <h2>VI HAR INGEN DATA</h2>
                          
                                <ListGroup>
                                {data.map(restaurant => (
                                            <ListGroup.Item
                                            action
                                            as={Link}
                                            to={`/restaurants/${restaurant.id}`}
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="me-auto">
                                                <div className="fw-bold">
                                                {restaurant.restaurantName}
                                                </div>
                                                <p>{restaurant.restaurantAddress}</p>
                                                <span>{restaurant.restaurantCuisine} | {restaurant.restaurantType} | {restaurant.restaurantOffer}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
               
              
                    {/*  <ResultsList city={city} setCity={setCity} data={data} querys={querys}/>  */}
                    </>
                    )}
                    
                </Row>
                
            </div>
        </>
    )
}
export default Sidebar


