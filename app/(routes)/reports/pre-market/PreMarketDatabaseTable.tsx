"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { SelectResearchReport } from "../../../../config/schema";

interface PreMarketDatabaseTableProps {
  reports: SelectResearchReport[];
}

const ITEMS_PER_PAGE = 5;

export default function PreMarketDatabaseTable({ reports }: PreMarketDatabaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(reports.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReports = reports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTable();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToTable();
    }
  };

  const scrollToTable = () => {
    const tableElem = document.getElementById("table");
    if (tableElem) {
      tableElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="clay-table-container">
      <div className="clay-table-header">
        <div>Report Info</div>
        <div>Date</div>
        <div style={{ textAlign: "center" }}>Action</div>
      </div>

      {reports.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "var(--muted)", fontWeight: "bold" }}>
          No Pre-Market reports found.
        </div>
      ) : (
        currentReports.map((report) => {
          return (
            <div className="clay-table-row" key={report.id}>
              <div>
                <div style={{ fontWeight: "700", fontSize: "16px", color: "var(--ink)", marginBottom: "6px" }}>
                  {report.title}
                </div>
                <div>
                  {(report.tags || []).map((tag, idx) => (
                    <span className="clay-tag" key={idx}>{tag}</span>
                  ))}
                  {report.reportType && <span className="clay-tag">{report.reportType}</span>}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--muted)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {report.publishDate ? format(new Date(report.publishDate), "MMM d, yyyy") : "N/A"}
              </div>

              <div style={{ textAlign: "center" }}>
                {report.pdfUrl ? (
                  <a 
                    href={report.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="clay-btn"
                  >
                    View Report
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>No PDF</span>
                )}
              </div>
            </div>
          );
        })
      )}

      {reports.length > 0 && (
        <div className="clay-pagination-wrap">
          <div className="clay-pagination-count">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, reports.length)} of {reports.length} reports
          </div>

          <div className="clay-pagination-controls">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="clay-pagination-arrow"
              aria-label="Previous Page"
              title="Previous Page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <span className="clay-pagination-page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="clay-pagination-arrow"
              aria-label="Next Page"
              title="Next Page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
