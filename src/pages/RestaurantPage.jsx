import AdminNavigation from "../components/NavigationAdmin"
import { Container, Row, Col, Button } from "react-bootstrap"
import useGetAllUsers from "../hooks/useGetAllUsers"
import { useAuthContext } from "../contexts/AuthContext"
import RestaurantForm from '../components/RestraurantForm'

const RestaurantPage = () => {
    const { data: users } = useGetAllUsers("users")
    const { showRestaurantForm, setShowRestaurantForm } = useAuthContext()

	return (
        <>
            <AdminNavigation admin={users} /> {/* send admin as prop to Navbar so it can be displayed in Dropdown later */}

            <Container>
                <Row className="d-flex justify-content-start p-3">
                    <Col xs={12} md={8}>
                        <h1>Alla restauranger</h1>
                    </Col>
                    <Col xs={12, { order: 'first' }} md={4, { order: 'last' }}>
                        <Button 
                            className="mb-2" 
                            active 
                            variant="dark" 
                            onClick={ () =>
                                setShowRestaurantForm(true) 
                            }
                        >
                            Skapa ny
                        </Button>
                    </Col>
                </Row>
            </Container>

            {showRestaurantForm &&
                <RestaurantForm showRestaurantForm={showRestaurantForm} setShowRestaurantForm={setShowRestaurantForm}
            />}
		</>	
	)
}

export default RestaurantPage