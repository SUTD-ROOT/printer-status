import { DB } from "../deps.ts";
import printers from "./printers.json" with { type: "json" };

const db = new DB("db");

const setupDatabase = () => {
  // create 'printers' and 'submissions' table
  db.execute(`
    CREATE TABLE IF NOT EXISTS printers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      level TEXT NOT NULL,
      unit TEXT,
      name TEXT,
      hours TEXT NOT NULL,
      UNIQUE(location, level, unit, name, hours)
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      printer_id INTEGER NOT NULL,
      submitted_by TEXT NOT NULL,
      submitted_on TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT,
      FOREIGN KEY (printer_id) REFERENCES printers(id)
    );
  `);

  // insert current printers in SUTD
  for (const printer of printers) {
    db.query(
      "INSERT OR IGNORE INTO printers (location, level, unit, name, hours) VALUES (:location, :level, :unit, :name, :hours)",
      printer,
    );
  }

  // Print out printers
  console.log("Created Printers: \n");
  for (
    const [id, location, level, unit, name, hours] of db.query(
      "SELECT * FROM printers",
    )
  ) {
    console.log(id, location, level, unit, name, hours);
  }

  // gracefully close when sigint is called
  Deno.addSignalListener("SIGINT", () => {
    db.close();
    Deno.exit();
  });
};

const getPrinters = () => {
  return db.queryEntries("SELECT * FROM printers");
};

const addSubmission = (
  printer_id: string,
  submitted_by: string,
  submitted_on: string,
  status: "active" | "inactive",
  message: string,
) => {
  db.query(
    `INSERT INTO submissions (
    printer_id,
    submitted_by,
    submitted_on,
    status,
    message
  ) VALUES (
    :printer_id,
    :submitted_by,
    :submitted_on,
    :status,
    :message
  )`,
    {
      printer_id,
      submitted_by,
      submitted_on,
      status,
      message,
    },
  );
};

export { addSubmission, db, getPrinters, setupDatabase };
