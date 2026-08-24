import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching site settings:", error);
    } else {
      setSettings(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, refetch: fetchSettings };
}
