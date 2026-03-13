"use client"
import { Container, Dropdown, Table } from "react-bootstrap";
import "@/style/customDropdown.css"
export default function OpinionSection() {
    return (
        <section className="px-4">
        {/* This px -4 is very important for all device it will keep scpace between screen edge and the section 1.5 rem left and right */}

            <Container className="OpinionSection">
                <Table responsive >
                    <thead className="customTableHead">
                        <tr >
                            <th >
                                Questions
                            </th>
                            <th>
                                Select Your Opinion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Do you believe Bangladesh is on the right path toward becoming a developed nation?
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="customDropdown" >
                                        Yes, I Agree
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                Do you believe Bangladesh is on the right path toward becoming a developed nation?
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="customDropdown" >
                                        Yes, I Agree
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                Do you believe Bangladesh is on the right path toward becoming a developed nation?
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="customDropdown" >
                                        Yes, I Agree
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>

                        </tr>
                    </tbody>
                </Table>
            </Container>
        </section>
    );
}