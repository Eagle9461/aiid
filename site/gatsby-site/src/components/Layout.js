import React from 'react';
import styled from 'styled-components';

import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import config from '../../config.js';
import Footer from './layout/Footer';
import Header from './ui/Header';

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 33px;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.background};
  z-index: 1;
  position: relative;

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (min-width: 767px) {
    /* Subtract the sidebar and margin width */
    width: calc(100% - 298px - 66px);
    > * {
      max-width: 100%;
    }
  }

  @media only screen and (max-width: 1123px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

const MaxWidth = styled.div`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const LeftSideBarWidth = styled.div`
  width: 298px;
  ${({ collapse }) => collapse && `width: 0;`}
`;

const RightSideBarWidth = styled.div`
  width: 224px;
  margin-left: -24px;
  z-index: 0;
  position: relative;

  @media (max-width: 965px) {
    display: none;
  }
`;

const Layout = ({ children, collapse, className, location }) => (
  <>
    <Header />
    <div className="tw-layout">
      <LeftSideBarWidth className={'hiddenMobile'} collapse={collapse}>
        <Sidebar collapse={collapse} />
      </LeftSideBarWidth>
      {config.sidebar.title && (
        <div
          className={'sidebarTitle sideBarShow'}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      )}
      <Content id="content" className="mb-5">
        <MaxWidth className={className}>{children}</MaxWidth>
      </Content>
      <RightSideBarWidth className={'hiddenMobile'}>
        <RightSidebar location={location} />
      </RightSideBarWidth>
    </div>
    <Footer />
  </>
);

export default Layout;
