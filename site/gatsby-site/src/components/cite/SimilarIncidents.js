import React, { useState } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const similarIncidentsQuery = gql`
  query SimilarIncidents($query: IncidentQueryInput) {
    incidents(query: $query) {
      incident_id
      title
      date
      reports {
        title
        report_number
        cloudinary_id
        image_url
      }
    }
  }
`;

const semanticallyRelated = async (text, num) => {
  const url = `/api/semanticallyRelated?num=${num}&text=${encodeURIComponent(text)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Semantic relation error');
  }
  const json = await response.json();

  return json;
};

const SimilarIncidentsList = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  .card {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    overflow: hidden;
    box-shadow: 0 2px 5px 0px #e3e5ec;
  }
  h3 {
    margin-top: 0.5em;
  }
  .card-img-top {
    margin: -1.25em -1.25em 0em -1.25em !important;
    width: calc(100% + 2.5em);
    max-width: calc(100% + 2.5em);
  }
`;

const SimilarIncidents = ({ item }) => {
  const client = useApolloClient();

  const [similarIncidents, setSimilarIncidents] = useState([]);

  return similarIncidents.length > 0 ? (
    <SimilarIncidentsList>
      <h2>Similar Incidents</h2>
      <p>By textual similarity</p>
      <hr />
      <p>
        Did <strong>our</strong> AI mess up? Flag{' '}
        <FontAwesomeIcon icon={faFlag} className="fa-flag" /> unrelated incidents
      </p>
      {similarIncidents.map((incident) => (
        <Card key={incident.incident_id}>
          <Card.Body>
            <Card.Img
              variant="top"
              src={incident.reports.filter((report) => report.image_url)[0].image_url}
            />
            <h3>{incident.title || incident.reports[0].title}</h3>
            <time>{format(parse(incident.date, 'yyyy-MM-dd', new Date()), 'MMM yyyy')}</time> ·{' '}
            <span>
              {incident.reports.length} {incident.reports.length == 1 ? 'report' : 'reports'}
            </span>
          </Card.Body>
        </Card>
      ))}
    </SimilarIncidentsList>
  ) : (
    <Button
      style={{ marginBottom: '1.5em' }}
      onClick={async () => {
        const similarity = await semanticallyRelated(item.text, 4);

        const similarIncidentsResponse = await client.query({
          query: similarIncidentsQuery,
          variables: {
            query: {
              incident_id_in: similarity.incidents.map((e) => e.incident_id),
            },
          },
        });

        setSimilarIncidents(similarIncidentsResponse.data.incidents);
      }}
    >
      Get similar incidents
    </Button>
  );
};

export default SimilarIncidents;
