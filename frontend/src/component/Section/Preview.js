import React, { Component } from "react";
import Popup from "reactjs-popup";

const styles = {
  listItem: {
    border: "transparent",
  },
  listItemClicked: {
    border: "4px #1c4fe8 solid",
  },
};

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1,
      openModal: false,
    };
    this.renderImage = this.renderImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }

  handleImageChange = (e) => {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    this.props.addImage(filesArr);
  };

  handleDelete = (e) => {
    this.closeModal();
    var removeId = Number(e.target.id);
    if (removeId < this.state.index) {
      this.setState({
        index: this.state.index - 1,
      });
    }
    if (removeId === this.state.index) {
      this.setState({
        index: -1,
      });
      this.props.selectImage({ id: -1, link: "" });
    }
    return this.props.removeImage(removeId);
  };

  chooseImage = (e) => {
    this.setState({
      index: Number(e.target.id),
    });
    this.props.selectImage(e.target);
  };

  renderImage = () => {
    if (this.props.imageArr && this.props.imageArr.length) {
      var imageArr = [];
      imageArr = this.props.imageArr.map((file, index) => (
        <div className="frame_inner" key={index}>
          <button className="btn-close" onClick={this.openModal}>
            <i id={index} className="fa fa-close" />
          </button>
          <figure className="product_image">
            <a href={`#${index}`}>
              <img
                src={URL.createObjectURL(file)}
                alt={index}
                id={index}
                className="img_small"
                onClick={this.chooseImage}
                style={
                  this.state.index === index
                    ? styles.listItemClicked
                    : styles.listItem
                }
              ></img>{" "}
            </a>{" "}
            <div className="img_name"> {file.name} </div>{" "}
          </figure>{" "}
        </div>
      ));
      return imageArr;
    } else {
      return <h2> Chưa có ảnh </h2>;
    }
  };

  render() {
    return (
      <div>
        <Popup
          open={this.state.openModal}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div>
            <div>Bạn đồng ý xóa ảnh?</div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="btn btn-primary" onClick={this.handleDelete}>
                  ✅ Xóa
                </button>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="btn btn-secondary" onClick={this.closeModal}>
                  ❌ Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </Popup>
        <span className="btn btn-primary btn-file">
          Browse <i className="fa fa-upload"></i> (PNG or JPG)
          <input
            type="file"
            multiple
            onChange={this.handleImageChange}
            accept=".png, .jpg"
          />
        </span>
        <div>Đã chọn {this.props.imageArr.length} ảnh</div>
        {/* <input
          type="file"
          id="myFile"
          name="filename"
          multiple
          onChange={this.handleImageChange}
        /> */}
        <div className="item" id="selectedFiles">
          {this.renderImage()}
        </div>
      </div>
    );
  }
}
export default Preview;
