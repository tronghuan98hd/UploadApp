import React, { Component } from "react";
import Header from "../Header/Header";
import Option from "../Section/Option";
import Preview from "../Section/Preview";
import axios from "axios";
import Show from "../Section/Show";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageArr: [],
      healths: [],
      forms: [],
      selectImg: {
        id: -1,
        link: "",
      },
      postData: {
        form: "",
        health: "",
        year: 0,
        month: 1,
        quarter: 1,
      },
      isLoading: false,
      show: false,
      openModal: false,
    };
    this.addImage = this.addImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(`http://10.0.30.64:8000/api/v1/healthfacility/`),
      axios.get(`http://10.0.30.64:8000/api/v1/forms/`),
    ]);
    this.setState({
      healths: firstResponse.data,
      forms: secondResponse.data,
      postData: {
        form: secondResponse.data[0].id,
        health: firstResponse.data[0].id,
        year: new Date().getFullYear(),
        quarter: 1,
        month: 1,
      },
    });
  }

  openModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }

  addImage(data) {
    var imageArr = [...this.state.imageArr, ...data];
    var imageMap = new Map();
    for (var image of imageArr) {
      imageMap.set(image.name, image);
    }
    var result = [...imageMap.values()].sort(function (a, b) {
      return a.name > b.name;
    });
    var offset = imageArr.length - result.length;
    if (offset > 0) {
      toast.info(`❎ Đã xóa ${offset} ảnh trùng`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    this.setState({
      // imageArr: [...this.state.imageArr, ...data],
      imageArr: result,
    });
  }

  removeImage(data) {
    var temp = [...this.state.imageArr];
    temp.splice(data, 1);
    this.setState({
      imageArr: temp,
    });
  }

  selectImage(data) {
    this.setState({
      selectImg: {
        id: data.id,
        link: data.src,
      },
    });
  }

  handleSubmit = (e) => {
    this.closeModal();
    this.setState({ isLoading: true, show: true });
    e.preventDefault();
    if (this.state.imageArr && this.state.imageArr.length) {
      let form_data = new FormData();
      var imageArr = this.state.imageArr.map((file) => {
        return {
          name: file.name,
          image: file,
        };
      });
      form_data.append("form", this.state.postData.form);
      form_data.append("health", this.state.postData.health);
      form_data.append("year", this.state.postData.year);
      form_data.append("quarter", this.state.postData.quarter);
      form_data.append("month", this.state.postData.month);
      for (let i = 0; i < imageArr.length; i++) {
        form_data.append("images", imageArr[i].image);
      }
      let url = "http://10.0.30.64:8000/api/v1/update_data/";
      axios
        .post(url, form_data)
        .then((res) => {
          toast.success("🎯 Đăng thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          this.setState({ isLoading: false, show: false });
        })
        .catch((err) => {
          console.log(err);
          toast.error("❎ Lỗi đăng ảnh", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          this.setState({ isLoading: false, show: false });
        });
    } else {
      toast.warn("☹️ Chưa có ảnh", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      this.setState({ isLoading: false, show: false });
      return;
    }
  };

  render() {
    console.log(this.state.postData.month);
    return (
      <div>
        <ToastContainer />
        <Header />
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
              id="option"
            >
              <Option
                forms={this.state.forms}
                healths={this.state.healths}
                postData={this.state.postData}
                changeData={(value) => this.setState(value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xl-3">
              <Preview
                imageArr={this.state.imageArr}
                removeImage={this.removeImage}
                selectImage={this.selectImage}
                addImage={this.addImage}
              />
              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10 col-xl-10">
                  {/* <button
                    disabled={this.state.show}
                    type="button"
                    className="btn btn-success"
                    onClick={this.handleSubmit}
                  >
                    {this.state.isLoading ? "Loading..." : "Xác nhận"}
                  </button> */}
                  <button
                    disabled={this.state.show}
                    type="button"
                    className="btn btn-success"
                    onClick={this.openModal}
                  >
                    {this.state.isLoading ? "Loading..." : "Xác nhận"}
                  </button>
                  <Popup
                    open={this.state.openModal}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                  >
                    <div>
                      <div>Bạn đồng ý gửi ảnh?</div>
                      <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <button
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                          >
                            ✅ Xác nhận
                          </button>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <button
                            className="btn btn-secondary"
                            onClick={this.closeModal}
                          >
                            ❌ Hủy bỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xl-2 icon-submit">
                  {this.state.isLoading ? (
                    <i className="fa fa-spinner fa-2x fa-pulse" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xl-9">
              <div className="sidenavright">
                <Show selectImg={this.state.selectImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
