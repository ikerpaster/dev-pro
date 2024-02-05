// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsSessions from 'src/views/dashboards/analytics/AnalyticsSessions'
import AnalyticsOverview from 'src/views/dashboards/analytics/AnalyticsOverview'
import AnalyticsPerformance from 'src/views/dashboards/analytics/AnalyticsPerformance'
import AnalyticsWeeklySales from 'src/views/dashboards/analytics/AnalyticsWeeklySales'
import AnalyticsVisitsByDay from 'src/views/dashboards/analytics/AnalyticsVisitsByDay'
import AnalyticsTotalRevenue from 'src/views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsSalesCountry from 'src/views/dashboards/analytics/AnalyticsSalesCountry'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsActivityTimeline from 'src/views/dashboards/analytics/AnalyticsActivityTimeline'
import AnalyticsTotalTransactions from 'src/views/dashboards/analytics/AnalyticsTotalTransactions'
import AnalyticsProjectStatistics from 'src/views/dashboards/analytics/AnalyticsProjectStatistics'
import AnalyticsTopReferralSources from 'src/views/dashboards/analytics/AnalyticsTopReferralSources'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <div className='text-red-500 text-2xl underline'>DashBoard Analytics</div>
 
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
