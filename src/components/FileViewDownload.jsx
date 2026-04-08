/**
 * Renders View and Download links for a submission that has fileData (base64).
 * Faculty and students use this to open or download the submitted file.
 */
function FileViewDownload({ fileData, fileName }) {
  if (!fileName && !fileData) {
    return <span className="file-view-download file-view-download--na">-</span>;
  }

  if (!fileData || !fileName) {
    return <span className="file-view-download file-view-download--na">{fileName || "File unavailable"}</span>;
  }

  const inferredMime = fileData?.split(",")[0]?.match(/data:([^;]+);/)?.[1];
  const fallbackMime = /\.pdf$/i.test(fileName)
    ? "application/pdf"
    : /\.(png|jpe?g|gif|bmp|webp)$/i.test(fileName)
    ? "image/*"
    : "application/octet-stream";
  const mime = inferredMime || fallbackMime;

  const createBlobUrl = () => {
    const base64 = fileData.split(",")[1] || "";
    const byteString = atob(base64);
    const ab = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
      ab[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mime });
    return URL.createObjectURL(blob);
  };

  const handleView = () => {
    try {
      const url = createBlobUrl();
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      window.alert("Could not open file.");
    }
  };

  const handleDownload = () => {
    try {
      const byteString = atob(fileData.split(",")[1]);
      const ab = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) ab[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Could not download file.");
    }
  };

  return (
    <span className="file-view-download">
      <span className="file-view-download__name">{fileName}</span>
      <span className="file-view-download__actions">
        <button type="button" className="file-view-download__btn" onClick={handleView}>
          View
        </button>
        <button type="button" className="file-view-download__btn" onClick={handleDownload}>
          Download
        </button>
      </span>
    </span>
  );
}

export default FileViewDownload;
