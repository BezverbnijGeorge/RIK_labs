#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTextEdit>
#include <QString>

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void newFile();     // Створити
    void openFile();    // Відкрити
    void saveFile();    // Зберегти
    void saveFileAs();  // Зберегти як

private:
    QTextEdit *textEdit;
    QString currentFile; // Шлях до поточного відкритого файлу
};

#endif