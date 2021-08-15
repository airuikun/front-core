import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';
import Button from '../button';
import './style/dragger.less';

export default class Dragger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.dragOverIndex = null;
    this.onChange = this.onChange.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  // 改变图片位置
  onChange(e) {
    const items = e.target.files;
    for (let i = 0; i < items.length; i += 1) {
      this.scanFiles(items[i], this.listing);
    }
  }

  // 删除图片
  onRemove(index) {
    const { files } = this.state;
    const { onRemove } = this.props;
    files.splice(index, 1);
    this.setState({ files });
    onRemove && onRemove(files);
  }

  // 图片base64与blob转换
  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  handleChange(files) {
    const { onChange } = this.props;
    files.forEach((dt) => {
      dt.blob = this.dataURItoBlob(dt.value);
    });
    onChange && onChange(files);
  }

  scanFiles(item) {
    const { limit } = this.props;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      let { files } = this.state;
      files.push({
        name: item.name,
        value: e.target.result,
      });
      files = limit > 0 ? files.slice(0, limit) : files;
      this.setState({ files });
      this.handleChange(files);
    };
    reader.readAsDataURL(item);
  }

  componentDidMount() {
    this.dragdropRef.addEventListener(
      'dragover',
      (event) => {
        event.preventDefault();
      },
      false
    );

    this.dragdropRef.addEventListener(
      'drop',
      (event) => {
        const items = event.dataTransfer.files;
        event.preventDefault();
        const length = items.length;
        for (let i = 0; i < length; i += 1) {
          this.scanFiles(items[i], this.listing);
        }
      },
      false
    );
  }

  renderPreview() {
    return this.state.files.map((file, index) => {
      return (
        <li
          key={`preview-key-${index}`}
          data-index={index}
          draggable
          onDragEnd={() => {
            const { files } = this.state;
            if (this.dragOverIndex === null || this.dragOverIndex === index) return;
            file = files[index];
            files.splice(this.dragOverIndex, 0, file);
            this.dragOverIndex < index
              ? files.splice(index + 1, 1)
              : files.splice(index, 1);
            this.dragOverIndex = null;
            this.setState({ files });
            this.handleChange(files);
          }}
          onDrop={(e) => {
            const dataset = e.target.dataset || { dragOverIndex: null };
            this.dragOverIndex = dataset.index;
          }}
        >
          <div
            data-index={index}
            style={{ backgroundImage: `url(${file.value})` }}
          />
          <p data-index={index}>
            <span>{file.name}</span>
            <Icon
              type="delete"
              onClick={() => {
                this.onRemove(index);
              }}
            />
          </p>
        </li>
      );
    });
  }

  render() {
    const { prefixCls, className, disabled } = this.props;
    const cls = this.classNames(`${prefixCls}`, className);
    const files = this.state.files;
    let limit = this.props.limit;
    let disabledBtn = false;
    /*
      limit 限制上传张数，到最大数量禁用Button
    */
    if (limit <= 0) limit = files.length + 1;
    if (files.length >= limit || disabled) disabledBtn = true;
    return (
      <div className={cls}>
        <div
          className={`${prefixCls}-wrap`}
          ref={(node) => {
            this.dragdropRef = node;
          }}
        >
          <Button
            disabled={disabledBtn}
            size="small"
            onClick={() => {
              this.fileRef.click();
            }}
          >
            <Icon type="cloud-upload" />拖拽或点击上传
          </Button>
          <input
            type="file"
            onChange={this.onChange}
            ref={(node) => {
              this.fileRef = node;
            }}
          />
          <p>只能上传png、gif、jpg格式图片，并不超过10M</p>
          <ul
            className={`${prefixCls}-list`}
            ref={(node) => {
              this.listing = node;
            }}
          >
            {this.renderPreview()}
          </ul>
        </div>
      </div>
    );
  }
}

Dragger.propTypes = {
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};
Dragger.defaultProps = {
  prefixCls: 'w-upload-dragger',
  disabled: false,
  onChange: () => {},
  onRemove: () => {},
};
