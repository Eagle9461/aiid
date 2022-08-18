import React from 'react';
import Tree from './tree';
import styled from 'styled-components';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import QuickAccess from 'components/discover/QuickAccess';
import { Trans } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </li>
  );
})`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${(props) => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: var(--primary3) !important;
    }

    ${(props) =>
      props.active &&
      `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      margin-left: 1ch;
      vertical-align: top;
    }
  }
`;

const Sidebar = styled('aside')`
  ${({ collapse }) => collapse && `display: none;`}
  font-family: Karla, sans-serif;
  font-weight: 700 !important;
  width: 250px;
  min-width: 250px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  -webkit-box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);

  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }

  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }

  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    height: auto;
  }
`;

const Divider = styled((props) => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 16px 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

const SidebarLayout = ({ collapse, setNavCollapsed }) => {
  return (
    <Sidebar collapse={collapse}>
      <QuickAccess />
      {config.sidebar.title ? (
        <div
          className={'tw-side-bar-title hiddenMobile'}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <ul className={'tw-side-bar-ul'}>
        <li className="hideFrontLine firstLevel item">
          <ul>
            <Tree setNavCollapsed={setNavCollapsed} />
          </ul>
        </li>
        {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
        {config.sidebar.links.map((link, key) => {
          if (link.link !== '' && link.text !== '') {
            return (
              <ListItem key={key} to={link.link}>
                <Trans>{link.text}</Trans>
                <ExternalLink size={14} />
              </ListItem>
            );
          }
        })}
      </ul>
    </Sidebar>
  );
};

export default SidebarLayout;
