const CountryCardSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="skel-list-row">
        <div className="skel skel-list-flag" />
        <div className="skel skel-list-name" />
        <div className="skel skel-list-cell" />
        <div className="skel skel-list-cell" />
        <div className="skel skel-list-badge" />
      </div>
    );
  }

  if (viewMode === 'compact') {
    return (
      <div className="skel-compact">
        <div className="skel skel-compact-flag" />
        <div className="skel-compact-body">
          <div className="skel skel-compact-name" />
          <div className="skel skel-compact-sub" />
        </div>
      </div>
    );
  }

  return (
    <div className="card skel-card h-100 overflow-hidden">
      <div className="skel skel-card-img" />
      <div className="p-3">
        <div className="d-flex justify-content-between mb-2">
          <div className="skel" style={{ width: '40%', height: 14, borderRadius: 4 }} />
          <div className="skel" style={{ width: '30%', height: 14, borderRadius: 4 }} />
        </div>
        <div className="skel mt-3" style={{ width: '100%', height: 32, borderRadius: 6 }} />
      </div>
    </div>
  );
};

export default CountryCardSkeleton;
