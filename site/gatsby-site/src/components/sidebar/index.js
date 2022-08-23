import React from 'react';
import Tree from './tree';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import QuickAccess from 'components/discover/QuickAccess';
import { Trans } from 'react-i18next';

const SidebarLayout = ({ collapse, setNavCollapsed }) => {
  return (
    <aside className={`tw-side-bar ${collapse ? 'collapse' : ''}`}>
      <QuickAccess />
      {config.sidebar.title ? (
        <div
          className={'tw-side-bar-title tw-hidden-mobile'}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <ul className={'tw-side-bar-ul'}>
        <li className="hide-front-line first-level item">
          <ul>
            <Tree setNavCollapsed={setNavCollapsed} />
          </ul>
        </li>
        {config.sidebar.links && config.sidebar.links.length > 0 && (
          <li className="tw-li-divider">
            <hr />
          </li>
        )}
        {config.sidebar.links.map((link, key) => {
          if (link.link !== '' && link.text !== '') {
            return (
              <li className={'side-bar-links'} key={key}>
                <a href={link.link} className={``} target="_blank" rel="noopener noreferrer">
                  <Trans>{link.text}</Trans>
                  <ExternalLink size={14} />
                </a>
              </li>
            );
          }
        })}
      </ul>
    </aside>
  );
};

export default SidebarLayout;
