import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useApolloClient, gql } from '@apollo/client';
import { Image } from '../../utils/cloudinary';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const incidentQuery = gql`
  query ProbablyRelatedIncidentIds($query: IncidentQueryInput) {
    incident(query: $query) {
      incident_id
      title
      reports {
        cloudinary_id
        report_number
        title
        url
      }
    }
  }
`;

const VisualizationWrapper = styled.div`
  > *,
  > * > * {
    width: 100%;
    height: 90vh;
    background: #ccc;
  }
  margin-bottom: 1em;
  margin-top: 1em;
`;

const Visualization = styled.div`
  max-height: 100vh;
  max-width: 100vh;
  height: 1000px;
  width: 1000px;
  position: relative;
  aspect-ratio: 1 / 1;
  > a {
    color: inherit;
    position: absolute;
    font-size: 75%;
    height: 2em;
    width: 2em;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 50%;
    margin-left: -1em;
    margin-top: -1em;
    background: rgba(240, 240, 240, 0.8);
    z-index: 1;
    text-align: center;
    line-height: 2em;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.25);
    transition: background 0.25s;
  }
  a + div {
    min-height: 6em;
    width: 15em;
    background: white;
    border-radius: 0.25rem;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.25);
    position: absolute;
    padding: 1em;
    overflow: hidden;
    img {
      margin: -1em -1em 1em -1em;
      max-width: unset;
      width: calc(100% + 4em);
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }
    h3 {
      font-size: 110%;
      margin: 0px;
    }
  }
  > a:hover:not(.current) {
    background: #dedede;
    z-index: 3;
    color: var(--primary3);
  }
  > a.current {
    background: #001a32;
    color: white;
    z-index: 2;
  }
`;

const PlotPoint = ({ spacialIncident, incident, state }) => {
  const client = useApolloClient();

  const [incidentData, setIncidentData] = useState(null);

  // We have to track this and render the incident card only when hovered.
  // Just hiding it with css is too slow and mages zooming laggy.
  const [hover, setHover] = useState(false);

  // I'm pretty sure the JS engine is smart enough to memoize this,
  // but I'm not taking my chances.
  const sqrtScale = Math.sqrt(state.scale);

  return (
    <>
      <a
        id={'spacial-incident-' + spacialIncident.incident_id}
        href={'/cite/' + spacialIncident.incident_id}
        style={{
          top: `calc(50% + 48% * ${spacialIncident.y})`,
          left: `calc(50% + 48% * ${spacialIncident.x})`,

          // The points do not grow as fast as the space between them,
          // allowing the user to zoom to more accurately select
          // from points that are very close to each other.
          transform: `scale(${1 / sqrtScale})`,
        }}
        className={spacialIncident.incident_id == incident.incident_id ? 'current' : ''}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => {
          setHover(true);
          if (!incidentData) {
            client
              .query({
                query: incidentQuery,
                variables: {
                  query: {
                    incident_id: spacialIncident.incident_id,
                  },
                },
              })
              .then((res) => {
                setIncidentData(res.data.incident);
              });
          }
        }}
      >
        {spacialIncident.incident_id}
      </a>
      {hover && (
        <div
          style={{
            top: `calc(50% + 48% * ${spacialIncident.y} + ${0.75 / sqrtScale}em)`,
            left: `calc(50% + 48% * ${spacialIncident.x} + ${0.75 / sqrtScale}em)`,
            transform: `scale(${1 / state.scale})`,
            transformOrigin: 'top left',
            zIndex: 10,
          }}
        >
          {incidentData ? (
            <>
              <Image publicID={incidentData.reports[0].cloudinary_id} />
              <h3>{incidentData?.title || incidentData.reports[0].title}</h3>
            </>
          ) : (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}
        </div>
      )}
    </>
  );
};

const TsneVisualization = ({ incident, spacialIncidents }) => {
  const currentSpacialIncident = spacialIncidents.find(
    (spacialIncident) => spacialIncident.incident_id == incident.incident_id
  );

  return (
    spacialIncidents && (
      <VisualizationWrapper>
        <TransformWrapper
          initialScale={2}
          initialPositionX={-500 + -500 * currentSpacialIncident?.x || 0}
          initialPositionY={-500 + -500 * currentSpacialIncident?.y || 0}
          limitToBounds={false}
          minScale={0.5}
          maxScale={10}
        >
          {({ state }) => (
            <TransformComponent>
              <Visualization>
                {spacialIncidents.map((spacialIncident) => (
                  <PlotPoint
                    spacialIncident={spacialIncident}
                    state={state}
                    incident={incident}
                    key={spacialIncident.incident_id}
                  />
                ))}
              </Visualization>
            </TransformComponent>
          )}
        </TransformWrapper>
      </VisualizationWrapper>
    )
  );
};

export default TsneVisualization;
