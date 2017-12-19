'use strict';

/**
 * @component Modal
 * @author CarltonXiang
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style/index.less';
import classname from 'classnames';
import Icon from 'cefc-ui-icon';
import Button from 'cefc-ui-button';

const REMOVE_MODAL = 'REMOVE_MODAL';
const ADD_MODAL = 'ADD_MODAL';
const defaultPrefixCls = 'cefc-modal';

class Modal extends Component {
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
    const { cancelText, confirmText, theme, prefixCls } = this.props;

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
    const { type, confirmText, theme } = this.props;

    switch(type) {
      case 'alert':
        return <Button color="blue" theme={theme} onClick={this.handleConfirm} full radius>{confirmText}</Button>

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
    const { header, closeIcon, prefixCls} = this.props;

    return (
      <div className={`${prefixCls}-header`}>
        <span>{header}</span>
        {closeIcon && <Icon className={`${prefixCls}-closeIcon`} type="delete"  onClick={this.handleClose} />}
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
    const prefixCls = this.props.prefixCls;
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

export default Modal;



