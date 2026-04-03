import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfile } from "@/Components/Validations/validationSchema";

export default function EditInfoCard({ user, onSave, onCancel }) {
   
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors,dirtyFields,isDirty }, //dirtyFields it tracks any change in default value if change it will set true and  glow
    } = useForm({
        resolver: zodResolver(editProfile),
        defaultValues: {
        username: user.username,   // Match register("username")
        profession: user.profession , 
        gender: user.gender?.toLowerCase(), 
        dob: user.dob || "",
        }
    });


    
    return (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Edit Information</h5>
                <div className="d-flex gap-2">
                    {/* onSave=hadleSave and onCancle=handleCancle are the parent State onclick it will call the handle from the parent
                        when press save button it will call handleSubmit and inside that onSave and onSave=hadleSave. 
                        So when click save it will send forms data to the handeleSave. /profile/page.js is parent
                    */}
                    
                    <Button size="sm" onClick={handleSubmit(onSave)}  disabled={!isDirty}> 
                        {/* if no chnaged in field means is dirty=false then the save button is disabled */}
                        Save
                    </Button>
                    <Button variant="danger" size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Form>

                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            {...register("username")}
                            isInvalid={!!errors.username} 
                            className={dirtyFields.username ? "bg-warning-subtle" : ""}

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Profession*</Form.Label>
                        <Form.Select size="md"  {...register("profession")} isInvalid={!!errors.profession} className={dirtyFields.profession ? "bg-warning-subtle" : ""}>
                            <option value="">Select your profession</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="farmer">Farmer</option>
                            <option value="engineer">Engineer</option>
                            <option value="doctor">Doctor</option>
                            <option value="pilot">Pilot</option>
                            <option value="govtJob">GovtJob</option>
                            <option value="defence">Defence</option>
                            <option value="housewife">Housewife</option>
                            <option value="lawyer">Lawyear</option>
                            <option value="others">Others</option>
                            
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        
                            {errors.profession?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Gender *</Form.Label>
                        <Row>

                            <Col xs={12} md={4} lg={4}>

                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Male"
                                    value="male"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                    className={dirtyFields.gender ? "bg-warning-subtle" : ""}
                                />
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Female"
                                    value="female"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                />
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Others"
                                    value="others"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                />
                            </Col>
                        </Row>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Date of Birth *</Form.Label>

                        <Form.Control
                            type="date"
                            {...register("dob")}
                            isInvalid={!!errors.dob}
                            className={dirtyFields.dob ? "bg-warning-subtle" : ""}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.dob?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}