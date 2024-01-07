import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '程序员林寻';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'codeNav',
          title: 'CSDN',
          href: 'https://blog.csdn.net/weixin_60257072?spm=1000.2115.3001.5343',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'GITHUB',
          href: 'https://github.com/linxun1209',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 项目源码
            </>
          ),
          href: 'https://github.com/linxun1209/xingchenTenement-fronted',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
