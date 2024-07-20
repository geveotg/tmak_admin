function Dashboard() {
    return (
        <div>
            dashboard
            {/* <div className={classes["dashboard-autorefresh"]}>
        <span>Autoupdate</span>
        <Switch checked={checkAutoupadte} onChange={onChange} />
      </div>

      <DashboardCards getAgain={getAgain} />

      <div className={classes["dashboard-statistics"]}>
        <div className={classes["used-device-progress"]}>
           <UsedDevicesProgres  getAgain={getAgain}/>
        </div>
        <ServerStatistics />
      </div>
      <div className={classes["statistics"]}>
        <PaymentStatistics getAgain={getAgain} />
        <OnlineUsersStatistics getAgain={getAgain} />
      </div>

      {widgets &&
        widgets.most_watched_statistics &&
        widgets.most_watched_statistics.enabled &&
        widgets.most_watched_statistics.enabled === "false" && (
          <>
            <div className="pro-widget-warning-text" style={{ marginTop: 30 }}>
              To use this feature you need to upgrade to Pro Version
              <br />
              Please contact us for more details.
            </div>
          </>
        )}

      <LivesStatisticsChart getAgain={getAgain} />
      <div className={classes["dashboard-page__charts"]}>
        <MoviesStatisticsChart getAgain={getAgain} />
        <SeriesStatisticsChart getAgain={getAgain} />
      </div> */}
        </div>
    );
}

export default Dashboard;
