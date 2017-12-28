'use strict';

/**
 * @component Modal
 * @author CarltonXiang
 */

import React, { Component } from 'react';
import reactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';
import Icon from 'cefc-ui-icon';
import Button from 'cefc-ui-button';
import EventEmitter from 'eventemitter3';
import style from './style/index.less';

let uid = Date.now();
const nextUid = () => {
  return (uid++).toString(36);
}

let modalContainer = '';
let ModalComponent = '';
let modals = [];
let eventEmitter = new EventEmitter();
const REMOVE_MODAL = 'REMOVE_MODAL';
const ADD_MODAL = 'ADD_MODAL';

const open = (options) => {
  if (!modalContainer) {
    createModalContainer();
  }

  if(!options.id) {
    options.id = nextUid();
  }

  eventEmitter.emit(ADD_MODAL, options);

  return options.id;
}

const close = (modalId) => {
  eventEmitter.emit(REMOVE_MODAL, modalId);
}

const createModalContainer = () => {
  modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  reactDOM.render(<Modal isOpen={false} />, modalContainer);
}

const createModal = (options) => {
  reactDOM.render(<Modal {...options} />, modalContainer);
}

const defaultPrefixCls = 'cefc-modal';

class ModalContainer extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    type: PropTypes.oneOf(['alert', 'confirm']),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    confirmText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    cancelText: PropTypes.string,
    closeIcon: PropTypes.bool,
    disableConfirm: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onHide: PropTypes.func,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    children: PropTypes.element
  }

  static defaultProps = {
    prefixCls: defaultPrefixCls,
    isOpen: true,
    closeIcon: true,
    disableConfirm: false,
    type: 'confirm',
    confirmText: '确定',
    cancelText: '取消',
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  getConfirmBtns = () => {
    const { cancelText, confirmText, prefixCls } = this.props;

    return [cancelText, confirmText].map((item, index) => {
      return {
        text: item,
        color: index === 0 ? 'white' : 'blue',
        onClick: index === 0 ? this.handleCancel : this.handleConfirm
      }
    }).map((btn, index) => {
      return (
        <div key={`footerBtn-${index}`}  className={`${prefixCls}-footer_btn`}>
          {(typeof btn.text === 'string') ?
            <Button color={btn.color} onClick={btn.onClick} full radius >{btn.text}</Button>
            : btn.text
          }
        </div>
      )
    });
  }

  getFooterBtns = () => {
    const { type, confirmText } = this.props;

    switch (type) {
      case 'alert':
        return <Button color="blue" onClick={this.handleConfirm} full radius>{confirmText}</Button>

      case 'confirm':
        return this.getConfirmBtns();

      default:
        return null;
    }
  }

  handleCancel = () => {
    this.handleClose();
    this.props.onCancel && this.props.onCancel();
  }

  handleConfirm = () => {
    if (this.props.disableConfirm) {

      return;
    }

    this.handleClose();
    this.props.onConfirm && this.props.onConfirm();
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.onHide && this.props.onHide();
  }

  //Render Modal Header
  renderHeader = () => {
    const { header, closeIcon, prefixCls } = this.props;

    return (
      <div className={`${prefixCls}-header`}>
        <span>{header}</span>
        {closeIcon && <Icon className={`${prefixCls}-closeIcon`} type="delete" onClick={this.handleClose} />}
      </div>
    )
  }

  //Render buttons
  renderFooter = () => {
    const { prefixCls } = this.props;

    return (
      <div className={`${prefixCls}-footer`}>
        {this.getFooterBtns()}
      </div>
    )
  }

  renderContent = () => {
    const { prefixCls } = this.props;
    const modalContent = this.props.content || this.props.children;
    const contentCls = classname(`${prefixCls}-content`, {
      [`${prefixCls}-content_text`]: typeof modalContent === 'string'
    });

    return (
      <div className={contentCls}>
        {modalContent}
      </div>
    );
  }

  render() {
    const { className, prefixCls } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {

      return null;
    }

    const modalCls = classname(prefixCls, className);

    return (
      <div className={modalCls}>
        <div className={`${prefixCls}-container`}>
          {this.renderHeader()}

          {this.renderContent()}

          {this.renderFooter()}
        </div>
      </div>
    )
  }
}


class Modal extends Component {
  constructor(props) {
    super(props);
    if (!ModalComponent) {
      ModalComponent = ModalContainer;
    }
  }

  componentDidMount() {
    eventEmitter.on(ADD_MODAL, this.addModal);
    eventEmitter.on(REMOVE_MODAL, this.removeModal);
  }

  addModal = (options) => {
    modals.push(options);
    createModal(options);
  }

  removeModal = (modalId) => {
    const modal = modals.filter((m) => {
      return m.id === modalId;
    });
  }


  render() {
    return <ModalComponent ref="modalComponent" {...this.props} />;
  }
}

Modal.open = open;
Modal.close = close;

export default Modal;