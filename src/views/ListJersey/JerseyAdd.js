import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Button,
  Spinner,
  Progress,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import swal from "sweetalert";
import FIREBASE from "../../config/FIREBASE";
const JerseyAdd = (props) => {
  const [image, setImage] = useState(DefaultImage);
  const [image2, setImage2] = useState(DefaultImage);
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [imageToDbUploaded, setImageToDbUploaded] = useState(null);
  const [imageToDb2Uploaded, setImageToDb2Uploaded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingImg2, setLoadingImg2] = useState(false);
  const [loadingRender, setLoadingRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [liga, setLiga] = useState("");
  const [price, setPrice] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const [weight, setWeight] = useState(0);
  const [type, setType] = useState("");
  const sizes = ["S", "M", "L", "XL", "XXL"];
  useEffect(() => {
    getAllLiga();
  }, []);
  const getAllLiga = () => {
    setLoadingRender(true);
    FIREBASE.database()
      .ref("ligas")
      .once("value", (querySnapShot) => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        if (!value) value = [];
        else {
          value = Object.keys(value).map((e) => ({
            ...value[e],
            uid: e,
            loading: false,
          }));
        }
        // console.log(value, "<<< value ligas");
        // dispatchSuccess(dispatch, GET_LIST_LIGA, value);
        setLigas(value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        // // dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), []);
        // setErrorLigas(JSON.stringify(err));
      })
      .finally((_) => {
        setLoadingRender(false);
      });
  };
  const uploadImage = (file, type = 1) => {
    if (type == 1) setLoadingImg(true);
    else setLoadingImg2(true);
    var uploadTask = FIREBASE.storage()
      .ref("jerseys")
      .child(file.name)
      .put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progressed =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressed == 100) progressed = 99;
        console.log("Upload is " + progressed + "% done");
        setProgress(+progressed);
        switch (snapshot.state) {
          case FIREBASE.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case FIREBASE.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        if (type == 1) {
          setImage(DefaultImage);
          setLoadingImg(false);
          setImageToDbUploaded("");
        } else {
          setLoadingImg2(false);
          setImage2(DefaultImage);
          setImageToDb2Uploaded("");
        }
        let errorMessage = error;
        if (error.message) errorMessage = error.message;
        swal({
          title: "Error",
          text: JSON.stringify(errorMessage),
          icon: "error",
        });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          if (type == 1) {
            setImageToDbUploaded(downloadURL);
            setProgress(100);
            setLoadingImg(false);
          } else {
            setImageToDb2Uploaded(downloadURL);
            setProgress2(100);
            setLoadingImg2(false);
          }
        });
      }
    );
  };
  const submit = () => {
    if(!price || +price < 0) setPrice(0)
    if (!weight || +weight < 0) setWeight(0);
    console.log(sizeSelected);
    return;
    if (
      name &&
      club &&
      imageToDbUploaded &&
      imageToDb2Uploaded &&
      sizeSelected.length != 0
    ) {
      //upload ke storage firebase
      setLoading(true);
      FIREBASE.database()
        .ref("ligas")
        .push({})
        .then((response) => {
          setProgress(100);
          props.history.replace("/admin/jersey");
        })
        .catch((error) => {
          let errorMessage = error;
          if (error.message) errorMessage = error.message;
          swal({
            title: "Error",
            text: JSON.stringify(errorMessage),
            icon: "error",
          });
        })
        .finally((_) => {
          setLoading(false);
          setProgress(0);
        });
    } else {
      swal({
        title: "Failed",
        text: "Harap Isi Semua Form!",
        icon: "error",
      });
    }
  };
  return (
    <div className="content">
      <Row>
        <Col>
          <Link to="/admin/jersey" className="btn btn-link p-2">
            <i className="nc-icon nc-minimal-left mr-1"></i>
            Kembali
          </Link>
        </Col>
      </Row>
      {loadingRender ? (
        <Card>
          <CardBody className="text-center">
            <Spinner color="primary" className=""></Spinner>
          </CardBody>
        </Card>
      ) : (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader tag="h4">Tambah Jersey</CardHeader>
              <CardBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  <Row className="">
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img src={image} width="200" />
                          <FormGroup>
                            <label>Foto Jersey (Depan)</label>
                            <Input
                              disabled={loadingImg || loadingImg2}
                              type="file"
                              accept=".jpg, .png, .jpeg"
                              id="img"
                              onChange={(event) => {
                                var file = event.target.files[0];
                                var t = file.type
                                  .split("/")
                                  .pop()
                                  .toLowerCase();
                                if (
                                  t != "jpeg" &&
                                  t != "jpg" &&
                                  t != "png" &&
                                  t != "bmp" &&
                                  t != "gif"
                                ) {
                                  event.target.value = "";
                                  setImage(DefaultImage);
                                } else {
                                  setImage(URL.createObjectURL(file));
                                  uploadImage(file, 1);
                                }
                              }}
                            />
                          </FormGroup>
                          {loadingImg && (
                            <>
                              <Progress value={progress} />{" "}
                              <span>{Math.floor(+progress)}%</span>
                            </>
                          )}
                        </Col>
                        <Col>
                          <img src={image2} width="200" />
                          <FormGroup>
                            <label>Foto Jersey (Belakang)</label>
                            <Input
                              disabled={loadingImg || loadingImg2}
                              type="file"
                              accept=".jpg, .png, .jpeg"
                              id="img"
                              onChange={(event) => {
                                var file = event.target.files[0];
                                var t = file.type
                                  .split("/")
                                  .pop()
                                  .toLowerCase();
                                if (
                                  t != "jpeg" &&
                                  t != "jpg" &&
                                  t != "png" &&
                                  t != "bmp" &&
                                  t != "gif"
                                ) {
                                  event.target.value = "";
                                  setImage2(DefaultImage);
                                } else {
                                  setImage2(URL.createObjectURL(file));
                                  uploadImage(file, 2);
                                }
                              }}
                            />
                          </FormGroup>
                          {loadingImg2 && (
                            <>
                              <Progress value={progress2} />{" "}
                              <span>{Math.floor(+progress2)}%</span>
                            </>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Jersey</label>
                        <Input
                          // placeholder="Nama Jersey"
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Liga</label>
                            <Input
                              type="select"
                              name="liga"
                              value={liga}
                              onChange={(event) => setLiga(event.target.value)}
                            >
                              <option value="">--Pilih--</option>
                              {ligas.map((e) => (
                                <option value={e.uid} key={e.uid}>
                                  {e.liga_name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Club</label>
                            <Input
                              // placeholder="Nama Jersey"
                              type="text"
                              value={name}
                              onChange={(event) => {
                                setClub(event.target.value);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label>Harga</label>
                        <Input
                          type="number"
                          // placeholder="Harga"
                          min="0"
                          required
                          value={price}
                          onChange={(event) => {
                            setPrice(event.target.value);
                          }}
                        />
                      </FormGroup>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Berat (kg)</label>
                            <Input
                              type="number"
                              value={weight}
                              name="weight"
                              min="0"
                              required
                              // placeholder="Berat"
                              onChange={(event) => {
                                setWeight(event.target.value);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={type}
                              name="type"
                              // placeholder="Jenis"
                              onChange={(event) => setType(event.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <label>Ukuran</label>
                          <FormGroup check>
                            {sizes.map((e, index) => (
                              <Label key={index} check className="mr-2 mb-1">
                                <Input
                                  type="checkbox"
                                  value={e}
                                  onChange={(event) => {
                                    const checked = event.target.checked;
                                    const value = event.target.value;
                                    if (checked) {
                                      //jika user ceklis ukuran
                                      //isi state array ukuran selected
                                      setSizeSelected([...sizeSelected, value]);
                                    } else {
                                      //jika user menghapus ceklis ukuran
                                      const newSize = sizeSelected
                                        .filter((size) => size !== value)
                                        .map((e) => e);
                                      setSizeSelected(newSize);
                                    }
                                  }}
                                />
                                {e}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={isReady}
                              onChange={(event) =>
                                setIsReady(event.target.value)
                              }
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={loading || loadingImg || loadingImg2}
                        className="float-right"
                      >
                        {loading && (
                          <Spinner
                            color="white"
                            size="sm"
                            className="mr-2"
                          ></Spinner>
                        )}
                        <span>Submit</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapStateToDispatch = (dispatch) => ({});
export default connect(mapStateToProps, mapStateToDispatch)(JerseyAdd);
