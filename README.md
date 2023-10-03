# Sozialatlas 2022 der Stadt Flensburg


![Sozialatlas 2022 der Stadt Flensburg](https://raw.githubusercontent.com/oklabflensburg/open-social-map/main/wiki/screenshot_social_map.jpg)

_Haftungsausschluss: Dieses Repository und die zugehörige Datenbank befinden sich derzeit in einer Beta-Version. Einige Aspekte des Codes und der Daten können noch Fehler enthalten. Bitte kontaktieren Sie uns per E-Mail oder erstellen Sie ein Issue auf GitHub, wenn Sie einen Fehler entdecken._


## Datenquelle

Der Sozialatlas der Stadt Flensburg wird bereits seit 2010 jährlich veröfentlicht. Dieser beinhaltet unter anderem Auswertungen zu folgenden Bereichen: Bevölkerung, Arbeitsmarkt und Beschäftigung, Wohnen, sozialen Sicherung sowie zu Hilfen zur Erziehung. Der Sozialatlas der Stadt Flensburg wird unter folgendem Link zum [Download](https://www.flensburg.de/Leben-Soziales/Familie-Soziales/Sozialatlas) angeboten. Mit dem Sozialatlas 2022 liegt erstmals die Fortschreibung von Sozialstrukturdaten für die Stadt Flensburg und ihre 13 Stadtteile vor. Die Geodaten der einzelnen Stadtteile wurden freundlicherweise von der Stabsstelle Statistik der Stadt Flensburg zur Verfügung gestellt.


## Interaktive Karte

Der digitale Sozialatlas soll eine Grundlage für verschiedene Planungsaktivitäten der Stadt Flensburg und deren Büger:innen anbieten. Ziel ist die differenzierte Beobachtung von relevanten Indikatoren, die Aufschluss über die soziale Lage der Stadt und ihrer 13 Stadtteile geben. Bitte dazu auf den Umriss eines Stadtteils klicken, um die jeweiligen Details angezeigt zu bekommen. Dies ist ein erster Prototyp. Wir möchten diesen mit Filtermöglichkeiten ausbauen.


## Technische Umsetzung

Wenn ihr die Geometrien zu den Stadtteilen importieren wollt, führt ihr die folgenden Befehle aus..

```
sudo apt install git virtualenv python3 python3-pip postgresql-15 postgresql-15-postgis-3 postgis
git clone ssh://git@ssh.github.com:443/oklabflensburg/open-social-map.git
cd open-social-map
```


Erstellt euch die `.env` wie folgt `vim .env` mit folgendem Inhalt

```
DB_PASS=postgres
DB_HOST=localhost
DB_USER=postgres
DB_NAME=postgres
DB_PORT=5432
```


Anschließend führt ihr die folgenden Zeilen zum Import der Tabellen aus

```
psql -U postgres -h localhost -d postgres -p 5432 < data/cleanup_database_schema.sql
psql -U postgres -h localhost -d postgres -p 5432 < data/flensburg_sozialatlas_metadaten.sql
psql -U postgres -h localhost -d postgres -p 5432 < data/flensburg_sozialatlas.sql
```


Nun im Verzeichnis `tools` eine virtuelle Umgebung aktivieren und die Abhängigkeiten installieren

```
cd tools
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```


Nun wird die Datei `insert_districts.py` aufgerufen und ausgeführt

```
./insert_districts.py data/flensburg_stadtteile.geojson
```


Geschafft. Jetzt noch die virtuelle Umgebung schließen

```
deactivate
```


Jetzt könnt ihr in der `PSQL` Umgebung folgende Abfrage ausführen


```sql
SELECT jsonb_build_object(
    'type', 'FeatureCollection',
    'crs', json_build_object(
        'type', 'name',
        'properties', json_build_object(
            'name', 'urn:ogc:def:crs:OGC:1.3:CRS84'
        )
    ),
    'features', jsonb_agg(fc.feature)
) AS geojson
FROM (
    SELECT jsonb_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(d.geometry)::jsonb,
        'properties', jsonb_build_object('district_id', d.id, 'district_name', d.name)
    ) AS feature
    FROM districts AS d

    -- WHERE d.id = 2
) AS fc;
```


## LICENSE

[CC0-1.0](LICENSE)
