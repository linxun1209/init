import { selectAvatarUrl, selectGender } from '@/constants';
import { getLoginUserUsingGet, updateMyUserUsingPost } from '@/services/backend/userController';
import {ModalForm, PageContainer, ProForm, ProFormText} from '@ant-design/pro-components';
import {ProFormItem, ProFormSelect} from '@ant-design/pro-form';
import { Button, Descriptions, Divider, message,UploadFile} from 'antd';
import React, {useEffect, useState} from 'react';
import PictureUploader from "@/components/PictureUploader";
import { history } from '@umijs/max';
import { useSearchParams } from '@@/exports';
import {COS_HOST} from "@/constants";
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

/**
 * 创建个人信息页面
 * @constructor
 */
const UserInfo: React.FC = () => {
  const [myUser,] = useState({
    userName: '',
    userAccount: '',
    userAvatar: '',
    userRole: 'user',
    gender: '',
    phone: '',
    email: '',
    userStatus: '0',
    userCode: '',
    createTime: '',
    updateTime: '',
  });
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');


  /**
   * 加载数据
   */
  const loadData = async () => {
    if (!id) {
      return;
    }
    try {
      const res = await getLoginUserUsingGet({
        id,
      });
      // 处理文件路径
      if (res.data) {
        const { userAvatar } = res.data ?? {};
        if (userAvatar) {
          // @ts-ignore
          res.data.distPath = [
            {
              uid: id,
              name: '文件' + id,
              status: 'done',
              url: COS_HOST + userAvatar,
              response: userAvatar,
            } as UploadFile,
          ];
        }
      }
    } catch (error: any) {
      message.error('加载数据失败，' + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  /**
   * 更新
   * @param values
   */
  const doUpdate = async (values: API.UserUpdateMyRequest) => {
    try {
      const res = await updateMyUserUsingPost(values);
      if (res.data) {
        location.reload();
        message.success('更新成功');
        history.push(`/user/userinfo/`);
      }
    } catch (error: any) {
      message.error('更新失败，' + error.message);
    }
  };


  /**
   * 提交修改
   * @param values
   */
  const doSubmit = async (values: API.UserUpdateMyRequest) => {
    // 文件列表转 url
    if (values.userAvatar && values.userAvatar.length > 0) {
      // @ts-ignore
      values.distPath = values.distPath[0].response;
    }
    await doUpdate(values)
  };


  return (
    <>
      <PageContainer title={<></>}>
        <Divider style={{ fontWeight: 'bold', color: 'blue' }}>用户信息</Divider>
        <Descriptions
          bordered
          column={1}
          size={'middle'}
          contentStyle={{ fontWeight: 'bold', color: 'blue' }}
        >
          <ProFormItem label="图片" name="picture">
            <PictureUploader biz="user_avatar" />
          </ProFormItem>
          {/*<Descriptions.Item style={{ textAlign: 'center' }} label="用户头像：">*/}
          {/*  <Image*/}
          {/*    src={myUser.userAvatar === null ? DEFAULT_AVATAR_URL : myUser.userAvatar}*/}
          {/*    width={30}*/}
          {/*    height={30}*/}
          {/*    style={{borderRadius:'50%'}}*/}
          {/*  />*/}
          {/*</Descriptions.Item>*/}
          <Descriptions.Item style={{ textAlign: 'center' }} label="用户名：">
            {myUser.userName}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="性别：">
            {myUser.gender}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="用户账户：">
            {myUser.userAccount}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="我的身份：">
            {myUser.userRole === 'user' ? '普通用户' : '管理员'}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="我的编号：">
            {myUser.userCode}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="手机号码：">
            {myUser.phone === null ? '尚未填写手机号码！' : myUser.phone}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="我的邮箱：">
            {myUser.email === null ? '尚未填写邮箱！' : myUser.email}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center', color: '#1bf113' }} label="我的状态：">
            {/*@ts-ignore*/}
            {myUser.userStatus === 0 ? '正常在线' : '账号异常'}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="用户创建时间：">
            {myUser.createTime}
          </Descriptions.Item>
          <Descriptions.Item style={{ textAlign: 'center' }} label="用户更新时间：">
            {myUser.updateTime}
          </Descriptions.Item>
        </Descriptions>

        <ModalForm<API.UserUpdateMyRequest>
          title="修改我的信息"
          trigger={
            <Button
              type="primary"
              shape="round"
              style={{ marginTop: '25px', width: '250px', marginLeft: '650px' }}
            >
              修改我的信息
            </Button>
          }
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await waitTime(1000);
            //点击发起请求
             await doSubmit(values);
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="userName"
              label="用户名"
              placeholder="请输入用户名"
              initialValue={myUser.userName}
              rules={[
                {
                  required: true,
                  message: '请输入选择用户名!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="userAccount"
              label="账号名称"
              placeholder="你想修改的账号名称"
              initialValue={myUser.userAccount}
              rules={[
                {
                  required: true,
                  message: '请输入选择账号名称!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="phone"
              label="修改手机号码"
              placeholder="修改手机号码密码"
              initialValue={myUser.phone}
            />
            <ProFormSelect
              width="md"
              name="gender"
              label="修改性别"
              placeholder="修改我的性别"
              options={selectGender}
              initialValue={myUser.gender}
            />
            <ProFormText
              width="md"
              name="email"
              label="修改邮箱"
              placeholder="修改修改后的邮箱"
              initialValue={myUser.email}
            />
            <ProFormText
              width="md"
              name="userCode"
              label="修改我的编码"
              placeholder="输入修改后的编码"
              initialValue={myUser.userCode}
            />
            <ProFormItem label="图片" name="picture">
              <PictureUploader biz="user_avatar" />
            </ProFormItem>
            <ProFormSelect
              name="userAvatar"
              fieldProps={{
                size: 'large',
              }}
              label="修改头像"
              options={selectAvatarUrl}
              placeholder={'请选择用户头像 '}
              initialValue={myUser.userAvatar}
              rules={[
                {
                  required: true,
                  message: '请输入选择用户头像!',
                },
              ]}
            />
          </ProForm.Group>
        </ModalForm>
      </PageContainer>
    </>
  );
};

export default UserInfo;
