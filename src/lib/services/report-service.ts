import axios from "axios";
import type { Session, User } from "$lib/types/report-types";
import type { Category, Report } from "$lib/types/report-types";

export const reportService = {
  baseUrl: "http://localhost:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async report(report: Report, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/categories/" + report.category + "/reports", report);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getCategories(session: Session): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getReports(session: Session): Promise<Report[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/reports");
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getReportById(id: string, session: Session): Promise<Report | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/reports/" + id);
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      console.log('error:', error);
      return null;
    }
  },

  async uploadImage(id: string, imageUrl: string, session: Session): Promise<Report | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.put(this.baseUrl + "/api/reports/image/" + id, { imageUrl });
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      console.log('error:', error);
      return null;
    }
  },
  async deleteImage(id: string, session: Session): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.delete(this.baseUrl + "/api/reports/image/" + id);
      return response.status == 200;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  },
};