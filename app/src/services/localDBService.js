import * as SQLite from "expo-sqlite";

// Open or create the database
// const db = SQLite.openDatabaseAsync("databaseApp");

export async function initDB(db) {
  try {
    await db.execAsync("PRAGMA journal_mode = WAL;");
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `CREATE TABLE IF NOT EXISTS usuario ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(10) NOT NULL);`
      );

      const result = await db.getFirstAsync(
        "SELECT COUNT(*) as count FROM usuario"
      );
      if (result.count === 0) {
        await db.runAsync("INSERT INTO usuario (nome) VALUES ('convidado');");
      }

      await db.runAsync(`
          CREATE TABLE IF NOT EXISTS medicamento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(50) NOT NULL,
            forma VARCHAR(30) NOT NULL,
            frequencia_dias CHAR(7),
            primeira_dose INTEGER,
            ultima_dose INTEGER
          );`);

      await db.runAsync(`
          CREATE TABLE IF NOT EXISTS medicamento_dia_horario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idMedicamento INTEGER,
            horario CHAR(5),
            dia INTEGER,
            status INTEGER,
            dosagem INTEGER,
            FOREIGN KEY (idMedicamento) REFERENCES medicamento(id) ON DELETE CASCADE
          );
          `);

      await db.runAsync(`
      CREATE VIEW IF NOT EXISTS med_full AS
          SELECT
              m.id AS id,
              m.nome AS nome,
              m.forma AS forma,
              h.dosagem AS dosagem,
              h.horario AS horario,
              h.dia AS dia,
              h.status AS status
          FROM
              medicamento m
          LEFT JOIN
              medicamento_dia_horario h
          ON
              m.id = h.idMedicamento;`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export async function dropT(db) {
  await db.execAsync("DROP TABLE medicamento;");
  await db.execAsync("DROP TABLE medicamento_dia_horario;");
  await db.execAsync("DROP TABLE usuario;");
  await db.execAsync("DROP VIEW med_full;");
}

export async function alterT() {
  const db = await SQLite.openDatabaseAsync("databaseApp");
  // await db.execAsync("ALTER TABLE medicamento_dia_horario ADD COLUMN dosagem INTEGER;");
  await db.execAsync("DELETE FROM medicamento;");
  const num = await db.getFirstAsync(
    "SELECT COUNT(*) as num FROM medicamento;"
  );
}
export async function allMedicamentos() {
  const db = await SQLite.openDatabaseAsync("databaseApp");
  const result = await db.getAllAsync("SELECT * FROM medicamento;");
  return result;
}

export async function loadFromDb(db) {
  try {
    const result = await db.getAllAsync("SELECT * FROM med_full;");
    return result;
  } catch (error) {
    console.error("Error loading from database:", error);
    return [];
  }
}

export async function saveMedicineInDb(db, medicamento) {
  try {
    await db.runAsync(
      `
          INSERT INTO medicamento (nome, forma, frequencia_dias, primeira_dose, ultima_dose)
          VALUES (?, ?, ?, ?, ?);`,
      [
        medicamento.nome,
        medicamento.forma,
        medicamento.frequenciaDias,
        medicamento.primeiraDose,
        medicamento.ultimaDose,
      ]
    );
    const idb = await db.getFirstAsync("SELECT last_insert_rowid();");
    id = idb["last_insert_rowid()"];
    return id;
  } catch (error) {
    console.error("Error saving medicine in database:", error);
  }
}

export async function saveHorariosInDb(db, idMedicamento, horarios) {
  horarios.forEach(async (med) => {
    db.runSync(
      `
        INSERT INTO medicamento_dia_horario (idMedicamento, horario, dia, status, dosagem)
        VALUES (?, ?, ?, ?, ?);`,
      [
        idMedicamento,
        med.time,
        med.dia,
        Number(med.status),
        Number(med.dosagem),
      ]
    );
  });
}

export async function dbExists() {
  try {
    const result = await db.getFirstAsync("SELECT * FROM usuario;");
    return result[0] === "1";
  } catch (error) {
    console.error("Error checking if database exists:", error);
    return false;
  }
}
