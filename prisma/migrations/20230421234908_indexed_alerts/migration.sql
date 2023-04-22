-- CreateIndex
CREATE INDEX "Alert_cameraId_idx" ON "Alert"("cameraId");

-- CreateIndex
CREATE INDEX "Alert_alertType_idx" ON "Alert"("alertType");

-- CreateIndex
CREATE INDEX "Alert_acknowledged_idx" ON "Alert"("acknowledged");
