import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useDownloadFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from("download_files")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching download files:", error);
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return { files, loading, refetch: fetchFiles };
}
