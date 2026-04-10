#include "mainwindow.h"
#include <QMenuBar>
#include <QFileDialog>
#include <QFile>
#include <QTextStream>
#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    textEdit = new QTextEdit(this);
    setCentralWidget(textEdit);
    setWindowTitle("Текстовий редактор");

    // Створення меню "Файл"
    QMenu *fileMenu = menuBar()->addMenu("Файл");

    fileMenu->addAction("Створити", this, &MainWindow::newFile, QKeySequence::New);
    fileMenu->addAction("Відкрити", this, &MainWindow::openFile, QKeySequence::Open);
    fileMenu->addAction("Зберегти", this, &MainWindow::saveFile, QKeySequence::Save);
    fileMenu->addAction("Зберегти як", this, &MainWindow::saveFileAs);
    fileMenu->addSeparator();
    fileMenu->addAction("Вихід", this, &QWidget::close, QKeySequence::Quit);
}

MainWindow::~MainWindow() {}

void MainWindow::newFile() {
    currentFile.clear();
    textEdit->clear();
    setWindowTitle("Новий файл");
}

void MainWindow::openFile() {
    QString fileName = QFileDialog::getOpenFileName(this, "Відкрити файл", "", "Текстові файли (*.txt);;Усі файли (*.*)");
    if (fileName.isEmpty()) return;

    QFile file(fileName);
    if (!file.open(QIODevice::ReadOnly | QFile::Text)) {
        QMessageBox::warning(this, "Помилка", "Не вдалося відкрити файл");
        return;
    }

    currentFile = fileName;
    QTextStream in(&file);
    textEdit->setText(in.readAll());
    file.close();
    setWindowTitle(fileName);
}

void MainWindow::saveFile() {
    if (currentFile.isEmpty()) {
        saveFileAs();
    } else {
        QFile file(currentFile);
        if (!file.open(QIODevice::WriteOnly | QFile::Text)) {
            QMessageBox::warning(this, "Помилка", "Не вдалося зберегти файл");
            return;
        }
        QTextStream out(&file);
        out << textEdit->toPlainText();
        file.close();
    }
}

void MainWindow::saveFileAs() {
    QString fileName = QFileDialog::getSaveFileName(this, "Зберегти як", "", "Текстові файли (*.txt)");
    if (fileName.isEmpty()) return;

    currentFile = fileName;
    saveFile();
}