import React from 'react';
import AiidHelmet from 'components/AiidHelmet';
import Layout from 'components/Layout';
import Featured from 'components/landing/Featured';
import Leaderboards from 'components/landing/Leaderboards';
import Blog from 'components/landing/Blog';
import WordCounts from 'components/landing/WordCounts';
import Sponsors from 'components/landing/Sponsors';
import AboutDatabase from 'components/landing/AboutDatabase ';
import LatestReports from 'components/landing/LatestReports';
import QuickSearch from 'components/landing/QuickSearch';
import QuickAdd from 'components/landing/QuickAdd';
import RandomReports from 'components/landing/RandomReports';
import Hero from 'components/landing/Hero';
import { useTranslation } from 'react-i18next';
import Container from '../elements/Container';
import Row from '../elements/Row';
import Col from '../elements/Col';

const LandingPage = (props) => {
  const {
    pageContext: { wordCountsSorted },
  } = props;

  const localWordCounts = wordCountsSorted.filter((word, index) => index < 10);

  const { t } = useTranslation(['translation', 'landing']);

  const title = t('Welcome to the Artificial Intelligence Incident Database', { ns: 'landing' });

  const metaDescription = t('The starting point for information about the AI Incident Database', {
    ns: 'landing',
  });

  return (
    <Layout {...props}>
      <AiidHelmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={metaDescription} />
      </AiidHelmet>
      <Container>
        <Row>
          <Col>
            <Hero />
          </Col>
        </Row>

        <Row className="tw-mt-2">
          <Col>
            <QuickSearch className="text-center border-0" />
          </Col>
        </Row>

        <Row className="tw-mt-4">
          <Col>
            <LatestReports />
          </Col>
        </Row>

        <Row className="tw-mt-4">
          <Col>
            <QuickAdd />
          </Col>
        </Row>

        <Row>
          <Col
            className="tw-mt-4 md:tw-flex-0-0-auto md:tw-w-full 992px:tw-flex-0-0-auto 992px:tw-w-2/4"
            sm={12}
            md={12}
            lg={6}
          >
            <AboutDatabase className="h-100" />
          </Col>
          <Col
            className="tw-mt-4 md:tw-flex-0-0-auto md:tw-w-full 992px:tw-flex-0-0-auto 992px:tw-w-2/4"
            sm={12}
            md={12}
            lg={6}
          >
            <Blog />
          </Col>
        </Row>

        <Row className="tw-mt-4">
          <Col>
            <Featured />
          </Col>
        </Row>

        <Row className="tw-mt-4">
          <Col>
            <Leaderboards />
          </Col>
        </Row>

        <Row className="tw-flex-col">
          <Col className="tw-mt-4" md={12} lg={6}>
            <WordCounts localWordCounts={localWordCounts} />
          </Col>
          <Col className="tw-mt-4" md={12} lg={6}>
            <RandomReports />
          </Col>
        </Row>

        <Row>
          <Col className="tw-mt-4" md={12} lg={12}>
            <Sponsors className="h-100" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default LandingPage;
