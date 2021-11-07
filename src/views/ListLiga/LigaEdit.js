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
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import swal from "sweetalert";
import FIREBASE from "../../config/FIREBASE";
import { useParams } from "react-router-dom";
const LigaEdit = (props) => {
  const params = useParams();
  const [image, setImage] = useState(DefaultImage);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [imageToDb, setImageToDb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRender, setLoadingRender] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const getDetailLiga = () => {
    setLoadingRender(true);
    FIREBASE.database()
      .ref("ligas")
      .child(params.id)
      .once("value", (querySnapShot) => {
        const result = querySnapShot.val() ? querySnapShot.val() : null;
        if (result) {
          setName(result.liga_name);
          setImage(result.image);
          setImageUrl(result.image);
        }
        setLoadingRender(false);
      })
      .catch((error) => {
        let errorMessage = error;
        if (error.message) errorMessage = error.message;
        setLoadingRender(false);
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
        props.history.replace("/admin/liga");
      });
  };
  useEffect(() => {
    getDetailLiga();
  }, []);
  const submit = async () => {
    if (name && imageToDb) {
      //upload ke storage firebase
      try {
        setLoading(true);
        setProgress(0);
        setLoadingProgress(true);
        await FIREBASE.storage().refFromURL(imageUrl).delete();
        var uploadTask = FIREBASE.storage()
          .ref("ligas")
          .child(imageToDb.name)
          .put(imageToDb);

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
            let errorMessage = error;
            if (error.message) errorMessage = error.message;
            setLoading(false);
            setProgress(0);
            swal({
              title: "Error",
              text: errorMessage,
              icon: "error",
            });
          },
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                const newData = {
                  liga_name: name,
                  image: downloadURL,
                };

                FIREBASE.database()
                  .ref("ligas/" + params.id)
                  .set(newData)
                  .then((response) => {
                    setProgress(100);
                    props.history.replace("/admin/liga");
                  })
                  .catch((error) => {
                    let errorMessage = error;
                    if (error.message) errorMessage = error.message;
                    swal({
                      title: "Error",
                      text: errorMessage,
                      icon: "error",
                    });
                  })
                  .finally((_) => {});
              });
          }
        );
      } catch (error) {
        let errorMessage = error;
        if (error.message) errorMessage = error.message;
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      }
    } else if (name) {
      setLoading(true);
      FIREBASE.database()
        .ref("ligas/" + params.id)
        .set({ liga_name: name, image: imageUrl })
        .then((response) => {
          props.history.replace("/admin/liga");
        })
        .catch((error) => {
          let errorMessage = error;
          if (error.message) errorMessage = error.message;
          swal({
            title: "Error",
            text: errorMessage,
            icon: "error",
          });
        })
        .finally((_) => {
          setLoading(false);
        });
    } else {
      swal({
        title: "Failed",
        text: "Nama Liga Diisi!",
        icon: "error",
      });
    }
  };
  return (
    <div className="content">
      <Row>
        <Col>
          <Link to="/admin/liga" className="btn btn-link p-2">
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
              <CardHeader tag="h4">Edit Liga</CardHeader>
              <CardBody>
                <img src={image} width="200" />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  <Row className="align-items-center">
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Liga</label>
                        <Input
                          type="file"
                          accept=".jpg, .png, .jpeg"
                          id="img"
                          onChange={(event) => {
                            var file = event.target.files[0];
                            var t = file.type.split("/").pop().toLowerCase();
                            if (
                              t != "jpeg" &&
                              t != "jpg" &&
                              t != "png" &&
                              t != "bmp" &&
                              t != "gif"
                            ) {
                              event.target.value = "";
                              setImage(DefaultImage);
                              setImageToDb(null);
                            } else {
                              setImage(URL.createObjectURL(file));
                              setImageToDb(file);
                            }
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Liga</label>
                        <Input
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" color="primary" disabled={loading}>
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
                {loadingProgress && (
                  <>
                    <Progress value={progress} />{" "}
                    <span>{Math.floor(+progress)}%</span>
                  </>
                )}
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
export default connect(mapStateToProps, mapStateToDispatch)(LigaEdit);
